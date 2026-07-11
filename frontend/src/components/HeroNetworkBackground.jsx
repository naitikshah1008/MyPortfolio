import { useEffect, useRef } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const seededValue = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const getRandomInRange = (seed, min, max) =>
  min + seededValue(seed) * (max - min);

const HeroNetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const pointer = { x: -1000, y: -1000, active: false };
    let animationFrame;
    let points = [];
    let width = 0;
    let height = 0;

    const isDarkMode = () => document.documentElement.classList.contains("dark");

    const getColors = () => {
      const dark = isDarkMode();
      return {
        dot: dark ? "rgba(103, 232, 249, 0.72)" : "rgba(8, 145, 178, 0.42)",
        line: dark ? "103, 232, 249" : "8, 145, 178",
        pointer: dark ? "45, 212, 191" : "13, 148, 136",
      };
    };

    const createPoints = () => {
      const area = width * height;
      const pointCount = clamp(Math.floor(area / 22000), 34, width < 768 ? 58 : 84);
      const edgePadding = width < 768 ? 16 : 32;

      points = [];
      for (let index = 0; index < pointCount; index += 1) {
        const seed = index + 1;
        const x = getRandomInRange(seed * 17, edgePadding, width - edgePadding);
        const y = getRandomInRange(seed * 31, edgePadding, height - edgePadding);
        const travelRadius = getRandomInRange(seed * 43, 28, 96);

        points.push({
          baseX: x,
          baseY: y,
          x,
          y,
          vx: getRandomInRange(seed * 59, -0.12, 0.12),
          vy: getRandomInRange(seed * 67, -0.12, 0.12),
          radiusX: travelRadius,
          radiusY: getRandomInRange(seed * 71, 22, 82),
          phaseX: seededValue(seed * 83) * Math.PI * 2,
          phaseY: seededValue(seed * 97) * Math.PI * 2,
          speedX: getRandomInRange(seed * 103, 0.00012, 0.00034),
          speedY: getRandomInRange(seed * 109, 0.00014, 0.00038),
          size: getRandomInRange(seed * 127, 1.3, 2.3),
        });
      }
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createPoints();
    };

    const drawLine = (from, to, alpha, color) => {
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.lineTo(to.x, to.y);
      context.strokeStyle = `rgba(${color}, ${alpha})`;
      context.lineWidth = 1;
      context.stroke();
    };

    const updatePoint = (point, index, time) => {
      let targetX = point.baseX;
      let targetY = point.baseY;

      if (!prefersReducedMotion.matches) {
        targetX += Math.sin(time * point.speedX + point.phaseX) * point.radiusX;
        targetY += Math.cos(time * point.speedY + point.phaseY) * point.radiusY;
      }

      if (pointer.active) {
        const dx = targetX - pointer.x;
        const dy = targetY - pointer.y;
        const distance = Math.hypot(dx, dy);

        if (distance > 0 && distance < 180) {
          const force = (1 - distance / 180) * 24;
          targetX += (dx / distance) * force;
          targetY += (dy / distance) * force;
        }
      }

      for (let i = 0; i < points.length; i += 1) {
        if (i === index) continue;

        const other = points[i];
        const dx = targetX - other.x;
        const dy = targetY - other.y;
        const distance = Math.hypot(dx, dy);

        if (distance > 0 && distance < 46) {
          const force = (1 - distance / 46) * 0.55;
          targetX += (dx / distance) * force;
          targetY += (dy / distance) * force;
        }
      }

      point.vx += (targetX - point.x) * 0.0018;
      point.vy += (targetY - point.y) * 0.0018;
      point.vx *= 0.92;
      point.vy *= 0.92;
      point.x += point.vx;
      point.y += point.vy;

      point.x = clamp(point.x, 0, width);
      point.y = clamp(point.y, 0, height);
    };

    const render = (time = 0) => {
      const colors = getColors();
      context.clearRect(0, 0, width, height);

      points.forEach((point, index) => updatePoint(point, index, time));

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const distance = Math.hypot(
            points[i].x - points[j].x,
            points[i].y - points[j].y
          );
          if (distance < 170) {
            const alpha = clamp((1 - distance / 170) * 0.2, 0, 0.2);
            drawLine(points[i], points[j], alpha, colors.line);
          }
        }
      }

      if (pointer.active) {
        points.forEach((point) => {
          const distance = Math.hypot(point.x - pointer.x, point.y - pointer.y);
          if (distance < 230) {
            const alpha = clamp((1 - distance / 230) * 0.34, 0, 0.34);
            drawLine(point, pointer, alpha, colors.pointer);
          }
        });
      }

      points.forEach((point) => {
        context.beginPath();
        context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        context.fillStyle = colors.dot;
        context.fill();
      });

      if (!prefersReducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const updatePointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      pointer.x = x;
      pointer.y = y;

      if (prefersReducedMotion.matches) {
        render(window.performance.now());
      }
    };

    const leavePointer = () => {
      pointer.active = false;
      if (prefersReducedMotion.matches) {
        render(window.performance.now());
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      render(window.performance.now());
    });

    const themeObserver = new MutationObserver(() => {
      render(window.performance.now());
    });

    resizeCanvas();
    render(window.performance.now());
    resizeObserver.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("pointermove", updatePointer);
    window.addEventListener("pointerleave", leavePointer);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", leavePointer);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-75 dark:opacity-85"
        aria-hidden="true"
      />
    </div>
  );
};

export default HeroNetworkBackground;
