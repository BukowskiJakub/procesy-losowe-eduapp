import React, { useEffect, useRef } from 'react';

interface MathWrapperProps {
  children: React.ReactNode;
  className?: string;
}

declare global {
  interface Window {
    MathJax: any;
  }
}

const MathWrapper: React.FC<MathWrapperProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (typeof window !== 'undefined' && window.MathJax) {
      // MathJax 3.x promise-based typesetting
      if (window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([container])
          .catch((err: Error) => {
            console.warn('MathJax typesetting failed:', err);
          });
      } 
      // Fallback for older versions
      else if (window.MathJax.typeset) {
         window.MathJax.typeset([container]);
      }
    }
  }, [children]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default MathWrapper;
