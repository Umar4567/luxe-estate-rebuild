import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  className?: string;
  cursorVisible?: boolean;
}

export const TypewriterEffect = ({ 
  text, 
  speed = 50, 
  className = '',
  cursorVisible = true 
}: TypewriterEffectProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {cursorVisible && !isComplete && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};
