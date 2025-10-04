"use client";

import { useEffect, useRef } from "react";
import MatterJS from "matter-js";
import "pathseg";

// Content
import { Letters } from "./content";

// Helper function to generate random number between min and max (inclusive)
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const THICKNESS = 10;

export default function Matter() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const Engine = MatterJS.Engine;
    const Render = MatterJS.Render;
    const Runner = MatterJS.Runner;
    const Common = MatterJS.Common;
    const MouseConstraint = MatterJS.MouseConstraint;
    const Mouse = MatterJS.Mouse;
    const Composite = MatterJS.Composite;
    const Vertices = MatterJS.Vertices;
    const Svg = MatterJS.Svg;
    const Bodies = MatterJS.Bodies;

    // provide concave decomposition support library
    Common.setDecomp(require("poly-decomp"));

    // create engine
    const engine = Engine.create();
    const { world } = engine;

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

    // add bodies
    if (typeof fetch !== "undefined") {
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
      }


      /**
       * Letters.
       */
      const vertexSets = [];

      Letters.forEach(async ({ paths = [] }) => {
        const isSinglePath = paths.length === 1;
        console.log('isSinglePath', isSinglePath);

        if (isSinglePath) {
          const vertexData = await loadAndPrepareSVG(paths[0]);
          vertexSets.push(vertexData);
        }
      });
      console.log("vertexSets", vertexSets);
      
      // Add all letters to the world
      Composite.add(world, vertexSets);
    } else {
      Common.warn("Fetch is not available. Could not load SVG.");
    }

    Composite.add(world, [
      // Bottom
      Bodies.rectangle(
        containerRef.current.clientWidth / 2,
        containerRef.current.clientHeight,
        containerRef.current.clientWidth,
        THICKNESS,
        { isStatic: true }
      ),
      // Right
      Bodies.rectangle(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight / 2,
        THICKNESS,
        containerRef.current.clientHeight * 100,
        { isStatic: true }
      ),
      // Left
      Bodies.rectangle(
        0,
        containerRef.current.clientHeight / 2,
        THICKNESS,
        containerRef.current.clientHeight * 100,
        { isStatic: true }
      ),
    ]);

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
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

    const onResize = () => {
      // Update render bounds
      render.bounds.max.x = containerRef.current.clientWidth;
      render.bounds.max.y = containerRef.current.clientHeight;

      // Update render options
      render.options.width = containerRef.current.clientWidth;
      render.options.height = containerRef.current.clientHeight;

      // Update canvas dimensions
      render.canvas.width = containerRef.current.clientWidth;
      render.canvas.height = containerRef.current.clientHeight;

      // Matter.Body.setPosition();
    };

    window.addEventListener("resize", onResize);

    return () => {
      // Composite.remove(world, mouseConstraint);
      // Composite.remove(world, mouse);
      // Composite.remove(world, render);
      // Composite.remove(world, runner);
      // Composite.remove(world, engine);
      window.removeEventListener("resize", onResize);
    };
  }, [])

  return <div className="bg-white fixed inset-0" ref={containerRef} />;
}
