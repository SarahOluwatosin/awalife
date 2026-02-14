import { useEffect, useRef, useCallback } from 'react';

interface Paw {
  x: number;
  y: number;
  opacity: number;
  scale: number;
  rotation: number;
  age: number;
  side: 'left' | 'right';
}

const PAW_PATH = `M12 4.5c0 1.38-.56 2.63-1.46 3.54A5.03 5.03 0 008 9.5a5.03 5.03 0 00-2.54-1.46A4.97 4.97 0 014 4.5C4 2.01 6.24 0 8 0s4 2.01 4 4.5zM4.5 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM11.5 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2 17a2 2 0 100-4 2 2 0 000 4zM14 17a2 2 0 100-4 2 2 0 000 4z`;

const PawCursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pawsRef = useRef<Paw[]>([]);
  const rafRef = useRef<number>(0);
  const lastPosRef = useRef({ x: -100, y: -100 });
  const stepCountRef = useRef(0);
  const reducedMotion = useRef(false);
  const pawPathRef = useRef<Path2D | null>(null);

  const spawnPaw = useCallback((x: number, y: number) => {
    const side = stepCountRef.current % 2 === 0 ? 'left' : 'right';
    stepCountRef.current++;
    const offsetX = side === 'left' ? -8 : 8;
    pawsRef.current.push({
      x: x + offsetX,
      y: y,
      opacity: 0.5,
      scale: 0.6 + Math.random() * 0.3,
      rotation: (Math.random() - 0.5) * 30,
      age: 0,
      side,
    });
    // Keep max 30 paws
    if (pawsRef.current.length > 30) {
      pawsRef.current.shift();
    }
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

    // Create paw path
    pawPathRef.current = new Path2D(PAW_PATH);

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion.current) return;
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 40) {
        spawnPaw(e.clientX, e.clientY);
        lastPosRef.current = { x: e.clientX, y: e.clientY };
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      pawsRef.current = pawsRef.current.filter((p) => p.opacity > 0.01);

      for (const paw of pawsRef.current) {
        paw.age += 1;
        paw.opacity = Math.max(0, paw.opacity - 0.008);
        paw.scale *= 0.998;

        ctx.save();
        ctx.translate(paw.x, paw.y);
        ctx.rotate((paw.rotation * Math.PI) / 180);
        ctx.scale(paw.scale, paw.scale);
        ctx.translate(-8, -8); // center the 16x16 path

        ctx.globalAlpha = paw.opacity;
        ctx.fillStyle = 'hsl(160, 65%, 36%)';
        if (pawPathRef.current) {
          ctx.fill(pawPathRef.current);
        }
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      mql.removeEventListener('change', handleMotionChange);
    };
  }, [spawnPaw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  );
};

export default PawCursorTrail;
