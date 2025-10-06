"use client";

import { useEffect, useMemo, useRef } from "react";
import MatterJS from "matter-js";
import MatterWrap from "matter-wrap";
import "pathseg";

// Content
import { LETTERS } from "./content";

// Utilities
import { loadSvg, select } from "./utils";
import { classes, shuffle } from "@/utils";

// Types
interface ExtendedMouse extends MatterJS.Mouse {
  mousewheel: EventListener;
}

// Consts
import {
  COLORS,
  ENTRANCE_OFFSET,
  THICKNESS,
  INITIAL_SIZE,
  LETTER_PHYSICS,
  X_POSITION_OFFSET,
} from "./consts";

export function Letters({ className }: { className?: string }) {
  MatterJS.use(MatterWrap);

  // Refs
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const wallsRef = useRef([]);
  const lettersRef = useRef([]);
  const initialDimensionsRef = useRef({ width: 0, height: 0 });

  // Randomize COLORS and LETTERS.
  const colors = useMemo(() => shuffle(COLORS), []);
  const letters = useMemo(() => shuffle(LETTERS), []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const { Bodies, Common, Composite, Engine, Mouse, MouseConstraint, Render, Runner, Svg, Vertices } = MatterJS;

    // provide concave decomposition support library
    Common.setDecomp(require("poly-decomp"));

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Store initial dimensions
    initialDimensionsRef.current = { width, height };

    // create engine
    const engine = Engine.create();
    const { world } = engine;
    engineRef.current = engine;
    engine.timing.timeScale = 2;

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
    const loadAndPrepareSVG = async (path) => {
      return await loadSvg(path).then((root) => {
        const color = Common.choose(colors);

        const vertex = select(root, "path")
          .map((path) => {
            const vertices = Svg.pathToVertices(path, 20);
            const scaledVertices = Vertices.scale(vertices, INITIAL_SIZE, INITIAL_SIZE);
            return scaledVertices;
          });
        const randomX =
          Math.random() * (width * X_POSITION_OFFSET) -
          (width * X_POSITION_OFFSET) / 2 +
          width / 2;
        const letter = Bodies.fromVertices(
          randomX,
          -(height / 2),
          vertex,
          {
            ...LETTER_PHYSICS,
            // set the body's wrapping bounds
            // plugin: {
            //   wrap: {
            //     min: {
            //       x: 0,
            //       y: -height,
            //     },
            //     max: {
            //       x: width,
            //       y: height,
            //     },
            //   },
            // },
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
          MatterJS.Body.rotate(letter, Math.random() * Math.PI * 2);
        }
        
        return letter;
      });
    };

    /**
     * Letters.
     */
    const loadLetters = async () => {
      // Load all letters in parallel for better performance
      const letterPromises = letters.map(async (letterData, i) => {
        const { path = null } = letterData;
        if (path) {
          try {
            const letter = await loadAndPrepareSVG(path);
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

  return (
    <div className={classes("fixed inset-0", className)} ref={containerRef} />
  );
}
