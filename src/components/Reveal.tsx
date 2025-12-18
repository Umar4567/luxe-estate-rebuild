import { FC, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface RevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  once?: boolean;
  delay?: number; // ms
  animation?: 'fade-up' | 'fade' | 'slide-left' | 'slide-right';
}

const Reveal: FC<RevealProps> = ({
  children,
  className = '',
  threshold = 0.08,
  once = true,
  delay = 0,
  animation = 'fade-up',
}) => {
  const [ref, inView] = useInView({ triggerOnce: once, threshold });

  const base = 'transition-all duration-700';
  const visible = 'opacity-100 translate-y-0 translate-x-0';
  const hiddenMap: Record<string, string> = {
    'fade-up': 'opacity-0 translate-y-6',
    'fade': 'opacity-0',
    'slide-left': 'opacity-0 -translate-x-6',
    'slide-right': 'opacity-0 translate-x-6',
  };

  const hidden = hiddenMap[animation] ?? hiddenMap['fade-up'];

  return (
    <div
      ref={ref}
      className={`${base} ${inView ? visible : hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
