// src/components/ProcessTimeline.jsx
import { useEffect, useRef, useState } from 'react';

const ProcessTimeline = ({ steps, primaryColor }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="process-timeline" ref={ref}>
      {steps.map((step, idx) => (
        <div
          key={idx}
          className={`timeline-step ${visible ? 'animate' : ''}`}
          style={{ animationDelay: `${idx * 0.15}s` }}
        >
          <div className="step-icon" style={{ background: primaryColor }}>
            <i className={step.icon}></i>
          </div>
          <div className="step-content">
            <h4>{step.step}</h4>
            <p>{step.desc}</p>
          </div>
          {idx < steps.length - 1 && (
            <div className="step-line" style={{ background: primaryColor }}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProcessTimeline;