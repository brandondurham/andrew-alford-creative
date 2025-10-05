"use client";

import { useCallback, useEffect, useRef } from "react";
import MatterJS from "matter-js";
import "pathseg";

// Content
import { Letters } from "./components/Matter/content";

// Consts
const THICKNESS = 10;
const INITIAL_SIZE = 0.5;

// Utilities
const select = (root, selector) => {
  return Array.prototype.slice.call(root.querySelectorAll(selector));
};

const loadSvg = (url) => {
  return fetch(url)
    .then((response) => {
      return response.text();
    })
    .then((raw) => {
      return new window.DOMParser().parseFromString(raw, "image/svg+xml");
    });
};

export default function ConcaveMatter() {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const wallsRef = useRef([]);
  const lettersRef = useRef([]);
  const initialDimensionsRef = useRef({ width: 0, height: 0 });

  // Function to update canvas dimensions and walls
  const updateCanvasDimensions = useCallback(() => {
    if (!containerRef.current || !renderRef.current || !engineRef.current) return;

    const container = containerRef.current;
    const render = renderRef.current;
    const engine = engineRef.current;
    const world = engine.world;

    // Update render dimensions
    render.canvas.width = container.clientWidth;
    render.canvas.height = container.clientHeight;
    render.options.width = container.clientWidth;
    render.options.height = container.clientHeight;

    // Update walls positions
    if (wallsRef.current.length > 0) {
      const Bodies = MatterJS.Bodies;
      
      // Update bottom wall
      MatterJS.Body.setPosition(wallsRef.current[0], {
        x: container.clientWidth / 2,
        y: container.clientHeight + THICKNESS / 2
      });
      MatterJS.Body.scale(wallsRef.current[0], container.clientWidth / wallsRef.current[0].bounds.max.x, 1);

      // Update right wall
      MatterJS.Body.setPosition(wallsRef.current[1], {
        x: container.clientWidth + THICKNESS / 2,
        y: container.clientHeight / 2
      });
      MatterJS.Body.scale(wallsRef.current[1], 1, container.clientHeight / wallsRef.current[1].bounds.max.y);

      // Update left wall
      MatterJS.Body.setPosition(wallsRef.current[2], {
        x: -THICKNESS / 2,
        y: container.clientHeight / 2
      });
      MatterJS.Body.scale(wallsRef.current[2], 1, container.clientHeight / wallsRef.current[2].bounds.max.y);
    }

    // Update viewport bounds
    MatterJS.Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: {
        x: container.clientWidth,
        y: container.clientHeight,
      },
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const Bodies = MatterJS.Bodies;
    const Common = MatterJS.Common;
    const Composite = MatterJS.Composite;
    const Composites = MatterJS.Composites;
    const Engine = MatterJS.Engine;
    const Mouse = MatterJS.Mouse;
    const MouseConstraint = MatterJS.MouseConstraint;
    const Render = MatterJS.Render;
    const Runner = MatterJS.Runner;
    const Svg = MatterJS.Svg;
    const Vertices = MatterJS.Vertices;

    // provide concave decomposition support library
    Common.setDecomp(require("poly-decomp"));

    // Store initial dimensions
    initialDimensionsRef.current = {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight
    };

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
        height: containerRef.current.clientHeight,
        width: containerRef.current.clientWidth,
        wireframes: false,
      },
    });

    renderRef.current = render;
    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
    // WALLS
    // • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
    const walls = [
      // Bottom
      Bodies.rectangle(
        containerRef.current.clientWidth / 2,
        containerRef.current.clientHeight + THICKNESS / 2,
        containerRef.current.clientWidth,
        THICKNESS,
        { isStatic: true }
      ),
      // Right
      Bodies.rectangle(
        containerRef.current.clientWidth + THICKNESS / 2,
        containerRef.current.clientHeight / 2,
        THICKNESS,
        containerRef.current.clientHeight * 100,
        { isStatic: true }
      ),
      // Left
      Bodies.rectangle(
        -THICKNESS / 2,
        containerRef.current.clientHeight / 2,
        THICKNESS,
        containerRef.current.clientHeight * 100,
        { isStatic: true }
      ),
    ];
    
    wallsRef.current = walls;
    Composite.add(world, walls);

    // • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
    // SVGs
    // • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
    const loadAndPrepareSVG = async (path) => {
      return await loadSvg(path).then((root) => {
        const color = Common.choose([
          "#f19648",
          "#f5d259",
          "#f55a3c",
          "#063e7b",
          "#ececd1",
        ]);

        const vertex = select(root, "path").map((path) =>
          Vertices.scale(Svg.pathToVertices(path, 10), INITIAL_SIZE, INITIAL_SIZE)
        );

        const letter = Bodies.fromVertices(
          Math.random() * containerRef.current.clientWidth,
          -containerRef.current.clientHeight,
          vertex,
          {
            // angle: Math.random() * Math.PI * 2, // Random rotation between 0° and 360°
            friction: 0.3,
            frictionAir: 0.00001,
            restitution: 0.8,
            render: {
              fillStyle: color,
              strokeStyle: color,
              lineWidth: 1,
            },
          },
          true
        );
        return letter;
      });
    };

    /**
     * Letters.
     */
    const loadLetters = async () => {
      const vertexSets = [];

      // Use Promise.all to wait for all async operations
      const letterPromises = Letters.map(async ({ paths = [] }) => {
        const isSinglePath = paths.length === 1;

        if (isSinglePath) {
          const vertexData = await loadAndPrepareSVG(paths[0]);
          return vertexData;
        }
        return null;
      });

      // Wait for all letters to load
      const results = await Promise.all(letterPromises);
      
      // Filter out null results and add to vertexSets
      const validLetters = results.filter(letter => letter !== null);
      vertexSets.push(...validLetters);
      
      // Store letter references for resizing
      lettersRef.current = validLetters;

      // Add all letters to the world
      Composite.add(world, vertexSets);
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
        x: containerRef.current.clientWidth,
        y: containerRef.current.clientHeight,
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

  return <div className="bg-white fixed inset-0" ref={containerRef} />;
}
