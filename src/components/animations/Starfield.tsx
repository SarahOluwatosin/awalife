import { useEffect, useRef, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  size: number;
  speed: number;
  hue: number;
}

interface StarfieldProps {
  starCount?: number;
  speed?: number;
  className?: string;
}

const Starfield = ({ starCount = 150, speed = 0.5, className = '' }: StarfieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  const createStar = useCallback((w: number, h: number, fromCenter = true): Star => {
    const cx = w / 2;
    const cy = h / 2;

    // Start near center with small random offset
    const offsetX = (Math.random() - 0.5) * w * 0.05;
    const offsetY = (Math.random() - 0.5) * h * 0.05;
    const x = fromCenter ? cx + offsetX : Math.random() * w;
    const y = fromCenter ? cy + offsetY : Math.random() * h;

    // Velocity pointing outward from center
    const angle = Math.atan2(y - cy, x - cx) + (Math.random() - 0.5) * 0.3;
    const baseSpeed = 0.3 + Math.random() * 1.2;

    return {
      x,
      y,
      prevX: x,
      prevY: y,
      vx: Math.cos(angle) * baseSpeed,
      vy: Math.sin(angle) * baseSpeed,
      size: 0.3 + Math.random() * 0.7,
      speed: baseSpeed,
      hue: 152 + Math.random() * 16, // emerald/teal range (152-168)
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mql.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
    };
    mql.addEventListener('change', handleMotionChange);

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize stars spread across the canvas
    const rect = canvas.getBoundingClientRect();
    starsRef.current = Array.from({ length: starCount }, () =>
      createStar(rect.width, rect.height, false)
    );

    const render = () => {
      const { width: w, height: h } = canvas.getBoundingClientRect();
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      if (reducedMotion.current) {
        // Static dots fallback
        for (const star of starsRef.current) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${star.hue}, 60%, 45%, 0.4)`;
          ctx.fill();
        }
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      for (const star of starsRef.current) {
        star.prevX = star.x;
        star.prevY = star.y;

        // Distance from center affects acceleration
        const dx = star.x - cx;
        const dy = star.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.sqrt(cx * cx + cy * cy);
        const progress = Math.min(dist / maxDist, 1);

        // Accelerate as stars move outward
        const accel = 1 + progress * 3;
        star.x += star.vx * speed * accel;
        star.y += star.vy * speed * accel;

        // Growing size as it approaches
        const currentSize = star.size * (1 + progress * 2.5);

        // Trail opacity increases with distance
        const alpha = 0.15 + progress * 0.6;

        // Draw trail line
        ctx.beginPath();
        ctx.moveTo(star.prevX, star.prevY);
        ctx.lineTo(star.x, star.y);
        ctx.strokeStyle = `hsla(${star.hue}, 65%, 50%, ${alpha * 0.6})`;
        ctx.lineWidth = currentSize * 0.8;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Draw star dot
        ctx.beginPath();
        ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 70%, 55%, ${alpha})`;
        ctx.fill();

        // Reset if out of bounds
        if (star.x < -20 || star.x > w + 20 || star.y < -20 || star.y > h + 20) {
          Object.assign(star, createStar(w, h, true));
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      mql.removeEventListener('change', handleMotionChange);
    };
  }, [starCount, speed, createStar]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default Starfield;
