'use client';
import { useCallback, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

export default function TextScramble({
  text,
  className = '',
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  as?: 'span' | 'a' | 'div';
}) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number>(0);
  const iterRef = useRef(0);

  const scramble = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    iterRef.current = 0;

    const run = () => {
      iterRef.current += 1;
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iterRef.current / 3) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      if (iterRef.current < text.length * 3) {
        rafRef.current = requestAnimationFrame(run);
      } else {
        setDisplay(text);
      }
    };
    rafRef.current = requestAnimationFrame(run);
  }, [text]);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setDisplay(text);
  }, [text]);

  return (
    <Tag
      className={`text-scramble ${className}`}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {display}
    </Tag>
  );
}
