"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MatterJS from "matter-js";
import "pathseg";

// Content
import { LETTERS } from "./content";

// Context
import { useDragging } from "@/context/DraggingContext";

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
  className?: string;
}

export function Letters({ className }: LettersProps) {
  const pathname = usePathname();
  const { setIsDragging } = useDragging();
  const [colors, setColors] = useState<Color[] | null>(null);
  const [letters, setLetters] = useState<typeof LETTERS | null>(null);

  // Refs
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const wallsRef = useRef([]);
  const lettersRef = useRef([]);
  const initialDimensionsRef = useRef({ width: 0, height: 0 });

  // Randomize COLORS and LETTERS.
  useEffect(() => {
    setColors(shuffle(COLORS));
    setLetters(shuffle(LETTERS));
  }, []);

  // Handle mousedown/mouseup to update dragging state
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = () => {
      setIsDragging(true);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [setIsDragging]);

  useEffect(() => {
    if (!containerRef.current || !colors || !letters) return;
    
    const { Bodies, Body, Common, Composite, Engine, Mouse, MouseConstraint, Render, Runner, Svg, Vertices } = MatterJS;

    // provide concave decomposition support library
    Common.setDecomp(require("poly-decomp"));

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Store initial dimensions
    initialDimensionsRef.current = { width, height };

    // create engine
    const engine = Engine.create();
    engine.timing.timeScale = 1.5;

    const { world } = engine;
    engineRef.current = engine;

    // create renderer
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

    // create runner
    const runner = Runner.create();
    runner.isFixed = true;
    Runner.run(runner, engine);

    // *******************************************************************************************************
    // WALLS
    // *******************************************************************************************************
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
      Bodies.rectangle(
        -THICKNESS / 2,
        height / 2,
        THICKNESS,
        height * 100,
        { isStatic: true }
      ),
    ];
    
    wallsRef.current = walls;
    Composite.add(world, walls);

    // *******************************************************************************************************
    // SVGs
    // *******************************************************************************************************
    // Create a local copy of colors to avoid state updates
    const availableColors = colors.map(color => color.hex);
    
    // Calculate uniform scale factor based on the largest letter dimension
    const isPortrait = width < height;
    const maxLetterDimension = isPortrait
      ? Math.max(...letters.map(letter => letter.width))
      : Math.max(...letters.map(letter => letter.height));
    const viewportConstraint = isPortrait ? width : height;
    const uniformScaleFactor = (viewportConstraint / maxLetterDimension) * 0.95;
    
    const loadAndPrepareSVG = async (path, index) => {
      return await loadSvg(path).then((root) => {
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
        });

        const yPosition = -(height * (index + 1)) + height / 2;

        const letter = Bodies.fromVertices(
          width / 2,
          yPosition,
          vertex,
          {
            ...LETTER_PHYSICS,
            collisionFilter: { group: -1 },
            // isSensor: true,
            // inertia: 2000,
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
          // Body.setInertia(letter, 10000);
        }

        return letter;
      }).catch(error => {
        console.error('Error loading SVG:', error);
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

      // const scaleBodies = () => {
      //   const allBodies = Composite.allBodies(world);
      //   allBodies.forEach((body) => {
      //     if (body.isStatic === true) return;
      //     Body.scale(body, uniformScaleFactor, uniformScaleFactor);
      //     // MatterJS.Body.setScale(body, uniformScaleFactor, uniformScaleFactor);
      //   });
      // };
      // scaleBodies();

      // Wait for all letters to load
      const loadedLetters = await Promise.all(letterPromises);
      const validLoadedLetters = loadedLetters.filter(item => item !== null);
      
      // Render letters with staggered timing to prevent overlap
      validLoadedLetters.forEach(({ letter, index }) => {
        setTimeout(() => {
          Composite.add(world, letter);
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
    };
  }, [colors, letters]);

  useEffect(() => {
    const resizeListener = () => {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      // Canvas
      renderRef.current.canvas.width = width;
      renderRef.current.canvas.height = height;

      // Floor
      MatterJS.Body.setPosition(wallsRef.current[0], { x: width / 2, y: height + THICKNESS / 2 });

      // Right Wall
      MatterJS.Body.setPosition(wallsRef.current[1], { x: width + THICKNESS / 2, y: height / 2 });

      // Left Wall
      MatterJS.Body.setPosition(wallsRef.current[2], { x: -THICKNESS / 2, y: height / 2 });
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [colors]);


  const isHome = pathname === "/";

  return (
    <div className={classes("fixed inset-0 transition-opacity duration-300", isHome ? "opacity-100" : "opacity-100", className)} ref={containerRef} />
  );
}
