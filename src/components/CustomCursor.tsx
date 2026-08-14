import React, { useEffect, useState, useRef } from 'react';
import { sounds } from '../utils/audio';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const lastTargetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Only enable for fine pointers (mouse), not touch screens
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest(
        'button, a, input, select, textarea, [role="button"], .cursor-pointer, .glass-card, [data-interactive="true"]'
      ) as HTMLElement | null;

      if (interactiveEl) {
        setIsPointer(true);
        // If cursor just entered a new interactive element, play touch sound
        if (lastTargetRef.current !== interactiveEl) {
          lastTargetRef.current = interactiveEl;
          sounds.playHover(540);
        }
      } else {
        setIsPointer(false);
        lastTargetRef.current = null;
      }
    };

    const handleMouseDown = () => {
      sounds.playClick();
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      lastTargetRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Ambient glowing spotlight following cursor */}
      <div
        className="fixed pointer-events-none z-30 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '280px' : '220px',
          height: isPointer ? '280px' : '220px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(139, 92, 246, 0.04) 45%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      {/* Precision cursor dot */}
      <div
        className={`fixed pointer-events-none z-50 transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference ${
          isPointer
            ? 'w-8 h-8 border border-cyan-400 bg-cyan-400/20 scale-125'
            : 'w-3 h-3 bg-cyan-400 shadow-[0_0_10px_#06b6d4]'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

