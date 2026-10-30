import React, { useEffect, useRef, useState } from "react";
import { AppTheme } from "@/App";

interface GhostCursorProps {
  theme: AppTheme;
  enabled?: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
}

export default function GhostCursor({ theme, enabled = true }: GhostCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Exact mouse coords (zero lag)
  const mousePos = useRef({ x: -100, y: -100 });
  // Ghost coords (smoothed with spring/lerp)
  const ghostPos = useRef({ x: -100, y: -100 });
  // Velocity for eye direction & tilt
  const ghostVel = useRef({ vx: 0, vy: 0 });

  const dotRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animFrameId = useRef<number | null>(null);

  // Theme-specific spectral colors
  const themeColors = {
    cempasuchil: {
      primary: "rgba(245, 158, 11, 0.95)", // amber-500
      glow: "rgba(245, 158, 11, 0.45)",
      tail: "rgba(251, 191, 36, 0.25)",
      eye: "#78350f",
    },
    spectral: {
      primary: "rgba(52, 211, 153, 0.95)", // emerald-400
      glow: "rgba(52, 211, 153, 0.45)",
      tail: "rgba(110, 231, 183, 0.25)",
      eye: "#064e3b",
    },
    bloodmoon: {
      primary: "rgba(244, 63, 94, 0.95)", // rose-500
      glow: "rgba(244, 63, 94, 0.45)",
      tail: "rgba(251, 113, 133, 0.25)",
      eye: "#881337",
    },
  }[theme];

  // Detect coarse pointer (mobile / touchscreen)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(isCoarse);
    }
  }, []);

  // Set up mouse listeners and animation loop
  useEffect(() => {
    if (!enabled || isTouchDevice) {
      document.body.classList.remove("custom-ghost-cursor-active");
      return;
    }

    document.body.classList.add("custom-ghost-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        ghostPos.current.x = e.clientX;
        ghostPos.current.y = e.clientY;
      }

      // Check if hovering clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "button, a, input, textarea, select, [role='button'], [tabindex='0'], .interactive-hover"
        );
        setIsHovering(!!interactive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Canvas size setup
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // 60-120fps physics update loop
    let lastTime = performance.now();
    let spawnTimer = 0;

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // 1. Move precision dot immediately with 0 lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // 2. Smooth damped spring follow for ghost companion
      const dx = mousePos.current.x - ghostPos.current.x;
      const dy = mousePos.current.y - ghostPos.current.y;
      
      const speed = isHovering ? 0.24 : 0.16;
      ghostPos.current.x += dx * speed;
      ghostPos.current.y += dy * speed;

      ghostVel.current.vx = dx * speed;
      ghostVel.current.vy = dy * speed;

      // Calculate tilt based on horizontal velocity
      const tilt = Math.max(-25, Math.min(25, ghostVel.current.vx * 1.5));
      const floatOffsetY = Math.sin(time * 0.005) * 4;

      if (ghostRef.current) {
        const scale = isClicking ? 0.8 : isHovering ? 1.25 : 1.0;
        ghostRef.current.style.transform = `translate3d(${ghostPos.current.x}px, ${
          ghostPos.current.y + floatOffsetY
        }px, 0) rotate(${tilt}deg) scale(${scale})`;
      }

      // 3. Ectoplasm smoke particle trail
      spawnTimer += dt;
      const distMoved = Math.hypot(dx, dy);
      if (spawnTimer > 0.035 && distMoved > 1.5 && particles.current.length < 35) {
        spawnTimer = 0;
        particles.current.push({
          x: ghostPos.current.x + (Math.random() * 8 - 4),
          y: ghostPos.current.y + 14 + (Math.random() * 4 - 2),
          size: Math.random() * 5 + 3,
          opacity: 0.55,
          vx: (Math.random() - 0.5) * 12,
          vy: Math.random() * -18 - 8,
        });
      }

      // Render particles on background canvas
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.opacity -= dt * 1.2;
          p.size = Math.max(0, p.size - dt * 2.5);

          if (p.opacity <= 0 || p.size <= 0) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.fillStyle = themeColors.tail;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("custom-ghost-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("resize", handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [enabled, isTouchDevice, isHovering, isClicking, themeColors]);

  if (!enabled || isTouchDevice || !isVisible) {
    return null;
  }

  // Calculate eye look offsets based on velocity toward mouse
  const eyeOffsetX = Math.max(-2, Math.min(2, ghostVel.current.vx * 0.2));
  const eyeOffsetY = Math.max(-1.5, Math.min(1.5, ghostVel.current.vy * 0.2));

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Background canvas for ectoplasmic particle trail */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full"
      />

      {/* 1. Precision Target Dot (0 Latency Pixel Focus) */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full transition-transform duration-0 ease-linear pointer-events-none"
        style={{
          backgroundColor: themeColors.primary,
          boxShadow: `0 0 8px ${themeColors.glow}, 0 0 2px #ffffff`,
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`,
        }}
      />

      {/* 2. Trailing Ethereal Ghost Sprite */}
      <div
        ref={ghostRef}
        className="absolute top-0 left-0 pointer-events-none will-change-transform -ml-4 -mt-3"
        style={{
          filter: `drop-shadow(0 0 10px ${themeColors.glow})`,
        }}
      >
        <svg
          width="32"
          height="38"
          viewBox="0 0 32 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-150"
        >
          {/* Ghost Body */}
          <path
            d="M16 2C8.26801 2 2 8.26801 2 16V30C2 31.8 3.8 33 5.4 32.2L9.2 30.3C10.2 29.8 11.4 30 12.2 30.7L14.8 32.8C15.5 33.4 16.5 33.4 17.2 32.8L19.8 30.7C20.6 30 21.8 29.8 22.8 30.3L26.6 32.2C28.2 33 30 31.8 30 30V16C30 8.26801 23.732 2 16 2Z"
            fill={themeColors.primary}
            fillOpacity={isHovering ? 0.95 : 0.85}
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Eyes (follow mouse direction) */}
          <g transform={`translate(${eyeOffsetX}, ${eyeOffsetY})`}>
            {/* Left Eye */}
            <ellipse
              cx={isHovering ? "11" : "11.5"}
              cy={isHovering ? "14" : "15"}
              rx={isHovering ? "2.5" : "1.8"}
              ry={isHovering ? "3" : "2.4"}
              fill={themeColors.eye}
            />
            {/* Left Pupil Highlight */}
            <circle cx="10.8" cy="13.8" r="0.7" fill="#ffffff" />

            {/* Right Eye */}
            <ellipse
              cx={isHovering ? "21" : "20.5"}
              cy={isHovering ? "14" : "15"}
              rx={isHovering ? "2.5" : "1.8"}
              ry={isHovering ? "3" : "2.4"}
              fill={themeColors.eye}
            />
            {/* Right Pupil Highlight */}
            <circle cx="20.2" cy="13.8" r="0.7" fill="#ffffff" />
          </g>

          {/* Cute Open Mouth when Hovering or Clicked */}
          {isHovering || isClicking ? (
            <ellipse
              cx="16"
              cy="21"
              rx={isClicking ? "2.5" : "1.8"}
              ry={isClicking ? "3.2" : "2.4"}
              fill={themeColors.eye}
            />
          ) : (
            /* Subtle smile */
            <path
              d="M14 20C14.5 21 17.5 21 18 20"
              stroke={themeColors.eye}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          )}

          {/* Cute Rosy Blushing Cheeks */}
          <ellipse
            cx="7.5"
            cy="18.5"
            rx="1.8"
            ry="1"
            fill={theme === "cempasuchil" ? "#f97316" : theme === "spectral" ? "#10b981" : "#e11d48"}
            fillOpacity="0.6"
          />
          <ellipse
            cx="24.5"
            cy="18.5"
            rx="1.8"
            ry="1"
            fill={theme === "cempasuchil" ? "#f97316" : theme === "spectral" ? "#10b981" : "#e11d48"}
            fillOpacity="0.6"
          />

          {/* Miniature Calavera Marigold / Witch Blossom Hat Accent */}
          <circle cx="16" cy="4" r="2.2" fill="#fbbf24" stroke="#ffffff" strokeWidth="0.6" />
        </svg>
      </div>
    </div>
  );
}

