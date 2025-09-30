import React from 'react';
import { useInView } from '../hooks/useInView';

type Effect = 'fade' | 'slide-up' | 'scale';

type RevealProps = {
  children: React.ReactNode;
  effect?: Effect;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  once?: boolean;
};

const effectToClass: Record<Effect, string> = {
  'fade': 'reveal-fade',
  'slide-up': 'reveal-slide-up',
  'scale': 'reveal-scale',
};

export const Reveal: React.FC<RevealProps> = ({ children, effect = 'slide-up', delay = 0, className = '', once = true }) => {
  const [ref, inView] = useInView<HTMLDivElement>({ once, rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
  const delayClass = delay > 0 ? ` reveal-delay-${delay}` : '';
  const base = effectToClass[effect];
  return (
    <div ref={ref} className={`${base}${delayClass} ${inView ? 'reveal-in' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
};

export default Reveal;


