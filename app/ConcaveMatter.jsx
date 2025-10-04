"use client";

import { useCallback, useEffect, useRef } from "react";
import MatterJS from "matter-js";
import "pathseg";

// Content
import { Letters } from "./components/Matter/content";

// Consts
const THICKNESS = 10;

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

    // create engine
    const engine = Engine.create();
    const world = engine.world;

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

    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
    // WALLS
    // • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
    Composite.add(world, [
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
    ]);

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
          Vertices.scale(Svg.pathToVertices(path, 10), 0.7, 0.7)
        );

        const letter = Bodies.fromVertices(
          Math.random(containerRef.current.clientWidth - 500 + 250) * 1000,
          -containerRef.current.clientHeight,
          vertex,
          {
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
      
      console.log("vertexSets", vertexSets);

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

    // Cleanup function
    return () => {
      Render.stop(render);
      Runner.stop(runner);
    };
  }, []);

  return <div className="bg-white fixed inset-0" ref={containerRef} />;
}
