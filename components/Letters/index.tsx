"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MatterJS from "matter-js";
import "pathseg";
import { usePathname } from "next/navigation";

// Content
import { LETTERS } from "./content";

// Context
import { useDragging } from "@/context/DraggingContext";
import { useTheme } from "@/context/ThemeContext";

// Utilities
import { loadSvg, select } from "./utils";
import { classes, shuffle } from "@/utils";

// Consts
import {
  COLORS,
  ENTRANCE_OFFSET,
  THICKNESS,
  LETTER_PHYSICS,
} from "./consts";

// Types
import type { Color } from './types'
interface ExtendedMouse extends MatterJS.Mouse {
  mousewheel: EventListener;
}

interface LettersProps {
  allowCollisions?: boolean;
  className?: string;
  engineTimeScale?: number;
  scaleFactor?: number;
}

export function Letters({ className, engineTimeScale = 1.3, scaleFactor = 0.9, allowCollisions = true }: LettersProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { setIsDragging } = useDragging();
  const [colors, setColors] = useState<Color[] | null>(null);
  const [letters, setLetters] = useState<typeof LETTERS | null>(null);

  // Refs
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const wallsRef = useRef([]);
  const lettersRef = useRef([]);
  const currentScaleFactorRef = useRef(1);

  // Memoize max letter dimensions to avoid recalculation
  const maxLetterDimensions = useMemo(() => ({
    width: Math.max(...(letters?.map(l => l.width) ?? [0])),
    height: Math.max(...(letters?.map(l => l.height) ?? [0]))
  }), [letters]);

  // Cache MatterJS modules to avoid destructuring on every render
  const MatterModules = useMemo(() => ({
    Bodies: MatterJS.Bodies,
    Body: MatterJS.Body,
    Common: MatterJS.Common,
    Composite: MatterJS.Composite,
    Engine: MatterJS.Engine,
    Mouse: MatterJS.Mouse,
    MouseConstraint: MatterJS.MouseConstraint,
    Render: MatterJS.Render,
    Runner: MatterJS.Runner,
    Svg: MatterJS.Svg,
    Vertices: MatterJS.Vertices,
  }), []);

  // Extract scale calculation to avoid duplication
  const calculateScaleFactor = useCallback((width: number, height: number) => {
    const isPortrait = width <= height;
    const maxLetterDimension = isPortrait
      ? maxLetterDimensions.width
      : maxLetterDimensions.height;
    const viewportConstraint = isPortrait ? width : height;
    return (viewportConstraint / maxLetterDimension) * scaleFactor;
  }, [maxLetterDimensions, scaleFactor]);

  // Randomize COLORS and LETTERS.
  useEffect(() => {
    if (!theme) return;
    
    // Filter colors by the current theme
    const filteredColors = COLORS.filter(color => 
      color.themes.some(t => t === theme)
    );
    setColors(shuffle(filteredColors));
    setLetters(shuffle(LETTERS));
  }, [theme]);

  // Memoize event handlers
  const handleMouseDown = useCallback(() => setIsDragging(true), [setIsDragging]);
  const handleMouseUp = useCallback(() => setIsDragging(false), [setIsDragging]);

  /**
   * Handle mousedown/mouseup to update dragging state.
   * When mousedown is triggers, we disable pointer-events so that you can drag over all content on the page.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseUp]);

  useEffect(() => {
    if (!containerRef.current || !colors || !letters) return;

    const {
      Bodies,
      Body,
      Common,
      Composite,
      Engine,
      Mouse,
      MouseConstraint,
      Render,
      Runner,
      Svg,
      Vertices,
    } = MatterModules;

    /**
     * Provide concave decomposition support library.
     */
    Common.setDecomp(require("poly-decomp"));

    /**
     * Store the container’s width and height.
     */
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    /**
     * Create engine to update the physics engine.
     */
    const engine = Engine.create();
    engine.timing.timeScale = engineTimeScale;

    const { world } = engine;
    engineRef.current = engine;

    /**
     * Create renderer to render the physics engine.
     */
    const render = Render.create({
      element: containerRef.current,
      engine,
      options: {
        background: "transparent",
        height,
        width,
        wireframes: false,
      },
    });

    renderRef.current = render;
    Render.run(render);

    /**
     * Create runner to update the physics engine.
     */
    const runner = Runner.create();
    runner.isFixed = true;
    Runner.run(runner, engine);

    /**
     * Create walls to prevent letters from escaping the container.
     */
    const walls = [
      // Bottom
      Bodies.rectangle(
        width / 2,
        height + THICKNESS / 2,
        width * 100,
        THICKNESS,
        { isStatic: true }
      ),
      // Right
      Bodies.rectangle(
        width + THICKNESS / 2,
        height / 2,
        THICKNESS,
        height * 100,
        { isStatic: true }
      ),
      // Left
      Bodies.rectangle(-THICKNESS / 2, height / 2, THICKNESS, height * 100, {
        isStatic: true,
      }),
    ];

    wallsRef.current = walls;
    Composite.add(world, walls);

    /**
     * SVGs. Create a local copy of colors to avoid state updates.
     */
    const availableColors = colors.map((color) => color.hex);

    /**
     * Calculate uniform scale factor based on the largest letter dimension.
     */
    const uniformScaleFactor = calculateScaleFactor(width, height);
    
    // Store the initial scale factor
    currentScaleFactorRef.current = uniformScaleFactor;

    /**
     * Load a single SVG and convert to vertices for Matter.
     */
    const loadAndPrepareSVG = async (path, index) => {
      return await loadSvg(path)
        .then((root) => {
          const color = Common.choose(availableColors);

          // Remove the selected color from the local array so no letters have the same color
          const colorIndex = availableColors.indexOf(color);
          if (colorIndex > -1) {
            availableColors.splice(colorIndex, 1);
          }

          const vertex = select(root, "path").map((path) => {
            const vertices = Svg.pathToVertices(path, 5);

            // Use the uniform scale factor for all letters
            const scaledVertices = Vertices.scale(
              vertices,
              uniformScaleFactor,
              uniformScaleFactor
            );
            return scaledVertices;
            return vertices;
          });

          // Position each letter index x 100vh.
          const yPosition = -(height * (index + 1)) + height / 2;

          const letter = Bodies.fromVertices(
            width / 2,
            yPosition,
            vertex,
            {
              ...LETTER_PHYSICS,
              // Allow bodies to overlap, removing all collision detection.
              collisionFilter: { group: allowCollisions ? 0 : -1 },
              render: {
                fillStyle: color,
                strokeStyle: color,
                lineWidth: 1,
              },
            },
            true
          );

          // Check if the body was created successfully before rotating
          if (letter) {
            // Rotate the entire body by a random angle between 0 and 360 degrees
            Body.rotate(letter, Math.random() * Math.PI * 2);
          }

          return letter;
        })
        .catch((error) => {
          console.error("Error loading SVG:", error);
          return null;
        });
    };

    /**
     * Letters.
     */
    const loadLetters = async () => {
      // Load all letters in parallel for better performance
      const letterPromises = letters?.map(async (letterData, i) => {
        const { path = null } = letterData || {};
        if (path) {
          try {
            const letter = await loadAndPrepareSVG(path, i);
            if (letter) {
              return { letter, index: i };
            }
          } catch (error) {
            console.error(`Error loading letter ${i}:`, error);
          }
        }
        return null;
      });

      // Wait for all letters to load
      const loadedLetters = await Promise.all(letterPromises);
      const validLoadedLetters = loadedLetters.filter((item) => item !== null);

      // Render letters with staggered timing to prevent overlap
      validLoadedLetters.forEach(({ letter, index }) => {
        setTimeout(() => {
          Composite.add(world, letter);

          // Scale the letter after adding it to the world
          // Body.scale(letter, uniformScaleFactor, uniformScaleFactor);

          lettersRef.current = [...lettersRef.current, letter];
        }, index * ENTRANCE_OFFSET);
      });
    };

    // Call the async function
    loadLetters();

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.8,
        render: {
          visible: false,
        },
      },
    });

    mouse.element.removeEventListener(
      "wheel",
      (mouse as ExtendedMouse).mousewheel
    );

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: {
        x: width,
        y: height,
      },
    });

    // Cleanup function
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      
      // Remove the canvas element from the DOM
      if (render.canvas && render.canvas.parentNode) {
        render.canvas.parentNode.removeChild(render.canvas);
      }
      
      // Clear refs
      lettersRef.current = [];
      wallsRef.current = [];
    };
  }, [MatterModules, allowCollisions, calculateScaleFactor, colors, engineTimeScale, letters]);

  useEffect(() => {
    const resizeListener = () => {
      if (!containerRef.current || !letters) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      // Canvas
      renderRef.current.canvas.width = width;
      renderRef.current.canvas.height = height;

      // Floor
      MatterModules.Body.setPosition(wallsRef.current[0], {
        x: width / 2,
        y: height + THICKNESS / 2,
      });

      // Right Wall
      MatterModules.Body.setPosition(wallsRef.current[1], {
        x: width + THICKNESS / 2,
        y: height / 2,
      });

      // Left Wall
      MatterModules.Body.setPosition(wallsRef.current[2], {
        x: -THICKNESS / 2,
        y: height / 2,
      });

      // Recalculate scale factor for new viewport size
      const newScaleFactor = calculateScaleFactor(width, height);

      // Calculate the ratio between new and current scale
      const scaleRatio = newScaleFactor / currentScaleFactorRef.current;

      // Scale all letter bodies with the ratio
      lettersRef.current.forEach((letter) => {
        if (letter && !letter.isStatic) {
          MatterModules.Body.scale(letter, scaleRatio, scaleRatio);
        }
      });

      // Update the current scale factor
      currentScaleFactorRef.current = newScaleFactor;
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [MatterModules, calculateScaleFactor, letters]);

  return (
    <div
      className={classes(
        "fixed inset-0 transition-opacity duration-300",
        pathname === "/" ? "opacity-100" : "opacity-20",
        className
      )}
      ref={containerRef}
    />
  );
}

Letters.displayName = "Letters";
