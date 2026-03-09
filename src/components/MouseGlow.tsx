'use client';
import { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    let raf: number;
    const animate = () => {
      const glow = glowRef.current;
      const trail = trailRef.current;
      if (glow) {
        glow.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (trail) {
        trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.08;
        trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.08;
        trail.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={trailRef} className="mouse-trail" />
      <div ref={glowRef} className="mouse-glow" />
    </>
  );
}
