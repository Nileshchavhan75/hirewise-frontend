// src/components/AnimatedCounter.jsx
import { useEffect, useRef, useState } from 'react';

const AnimatedCounter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={countRef} className="counter-value">
      {count}{suffix}
    </span>
  );
};

export default AnimatedCounter;