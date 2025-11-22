import React, { useEffect, useRef } from 'react';

interface MathDisplayProps {
  formula: string;
  className?: string;
  inline?: boolean;
}

declare global {
  interface Window {
    MathJax: any;
  }
}

const MathDisplay: React.FC<MathDisplayProps> = ({ formula, className = '', inline = false }) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Insert the raw LaTeX with delimiters
    // Use \[ ... \] for display mode and \( ... \) for inline mode
    const delimiters = inline ? ['\\(', '\\)'] : ['\\[', '\\]'];
    // Clean the formula string to avoid issues
    const cleanFormula = String(formula || '');
    container.innerHTML = `${delimiters[0]}${cleanFormula}${delimiters[1]}`;

    // 2. Ask MathJax to typeset this specific element
    if (typeof window !== 'undefined' && window.MathJax) {
      // MathJax 3.x promise-based typesetting
      if (window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([container])
          .catch((err: Error) => {
            console.warn('MathJax typesetting failed:', err);
            container.innerHTML = cleanFormula; // Fallback to raw text on error
          });
      } 
      // Clear pending typeset if any (for older versions or race conditions)
      else if (window.MathJax.typeset) {
         window.MathJax.typeset([container]);
      }
    }
  }, [formula, inline]);

  const Wrapper = inline ? 'span' : 'div';

  return (
    <Wrapper 
      ref={containerRef as any} 
      className={`${inline ? 'inline-block align-middle' : 'block my-4 text-center overflow-x-auto py-2'} ${className}`}
    />
  );
};

export default MathDisplay;