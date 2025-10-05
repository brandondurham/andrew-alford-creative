"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import MatterJS from "matter-js";
import "pathseg";

// Content
import { Letters } from "./content";

// Utilities
import { loadSvg, select } from "./utils";

// Consts
import { BASE_WIDTH, COLORS, THICKNESS, INITIAL_SIZE, LETTER_PHYSICS } from "./consts";

export default function ConcaveMatter() {
  // Refs
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const wallsRef = useRef([]);
  const lettersRef = useRef([]);
  const initialDimensionsRef = useRef({ width: 0, height: 0 });

  // Load colors and randomize.
  const colors = useMemo(() => {
    const shuffled = [...COLORS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Function to update canvas dimensions and walls on resize.
  const updateCanvasDimensions = useCallback(() => {
    if (!containerRef.current || !renderRef.current || !engineRef.current) return;

    const container = containerRef.current;
    const render = renderRef.current;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Update render dimensions
    render.canvas.width = width;
    render.canvas.height = height;
    // render.options.width = width;
    // render.options.height = height;

    // Update walls positions
    if (wallsRef.current.length > 0) {
      // Update bottom wall
      MatterJS.Body.setPosition(wallsRef.current[0], {
        x: width / 2,
        y: height + THICKNESS / 2
      });
      MatterJS.Body.scale(wallsRef.current[0], width / wallsRef.current[0].bounds.max.x, 1);

      // Update right wall
      MatterJS.Body.setPosition(wallsRef.current[1], {
        x: width + THICKNESS / 2,
        y: height / 2
      });
      MatterJS.Body.scale(wallsRef.current[1], 1, height / wallsRef.current[1].bounds.max.y);

      // Update left wall
      // MatterJS.Body.setPosition(wallsRef.current[2], {
      //   x: -THICKNESS / 2,
      //   y: height / 2
      // });
      // MatterJS.Body.scale(wallsRef.current[2], 1, height / wallsRef.current[2].bounds.max.y);
    }

    // Update viewport bounds
    MatterJS.Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: {
        x: width,
        y: height,
      },
    });


  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const Bodies = MatterJS.Bodies;
    const Common = MatterJS.Common;
    const Composite = MatterJS.Composite;
    const Engine = MatterJS.Engine;
    const Mouse = MatterJS.Mouse;
    const MouseConstraint = MatterJS.MouseConstraint;
    const Render = MatterJS.Render;
    const Runner = MatterJS.Runner;
    const Svg = MatterJS.Svg;
    const Vertices = MatterJS.Vertices;

    // provide concave decomposition support library
    Common.setDecomp(require("poly-decomp"));

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Store initial dimensions
    initialDimensionsRef.current = { width, height };

    // create engine
    const engine = Engine.create();
    const world = engine.world;
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
          .map((path) =>
            Vertices.scale(
              Svg.pathToVertices(path, 10),
              INITIAL_SIZE,
              INITIAL_SIZE
            )
          );

        const letter = Bodies.fromVertices(
          width / 2,
          -height,
          vertex,
          {
            ...LETTER_PHYSICS,
            render: {
              fillStyle: color,
              strokeStyle: color,
              lineWidth: 1,
            },
          },
          true
        );
        
        // Rotate the entire body by a random angle between 0 and 360 degrees
        MatterJS.Body.rotate(letter, Math.random() * Math.PI * 2);
        return letter;
      });
    };

    /**
     * Letters.
     */
    const loadLetters = async () => {
      const validLetters = [];

      // Add letters one at a time with 1-second intervals
      for (let i = 0; i < Letters.length; i++) {
        const { paths = [] } = Letters[i];
        const isSinglePath = paths.length === 1;

        if (isSinglePath) {
          try {
            const letter = await loadAndPrepareSVG(paths[0]);
            if (letter) {
              validLetters.push(letter);
              lettersRef.current = [...validLetters];
              
              // Add the letter to the world immediately
              Composite.add(world, letter);
            }
          } catch (error) {
            console.error(`Error loading letter ${i}:`, error);
          }
        }

        // Wait 1 second before adding the next letter (except for the last one)
        if (i < Letters.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    };

    // Call the async function
    loadLetters();

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

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

    // Add resize listener
    const handleResize = () => {
      updateCanvasDimensions();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
    };
  }, [updateCanvasDimensions]);

  return (
    <div
      className="bg-fixed bg-[#dddddd] bg-[radial-gradient(#777777_1px,transparent_2px)] bg-size-[20px_20px] fixed inset-0"
      ref={containerRef}
    />
  );
}
