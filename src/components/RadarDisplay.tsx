
import React, { useEffect, useState } from 'react';

interface RadarDisplayProps {
  threats: Array<{
    id: string;
    x: number;
    y: number;
    type: 'aircraft' | 'naval' | 'ground' | 'cyber';
    threat_level: string;
  }>;
  size?: number;
}

export const RadarDisplay: React.FC<RadarDisplayProps> = ({ 
  threats = [], 
  size = 200 
}) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getBlipColor = (type: string, threatLevel: string) => {
    if (threatLevel === 'critical') return '#ff4444';
    if (threatLevel === 'high') return '#ff8800';
    if (threatLevel === 'medium') return '#ffff44';
    return '#44ff44';
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Radar background */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Concentric circles */}
        {[0.25, 0.5, 0.75, 1].map((radius, i) => (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={(size / 2) * radius}
            fill="none"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="1"
          />
        ))}
        
        {/* Cross lines */}
        <line
          x1="0"
          y1={size / 2}
          x2={size}
          y2={size / 2}
          stroke="rgba(34, 197, 94, 0.3)"
          strokeWidth="1"
        />
        <line
          x1={size / 2}
          y1="0"
          x2={size / 2}
          y2={size}
          stroke="rgba(34, 197, 94, 0.3)"
          strokeWidth="1"
        />

        {/* Rotating sweep line */}
        <line
          x1={size / 2}
          y1={size / 2}
          x2={size / 2 + (size / 2) * Math.cos((rotation * Math.PI) / 180)}
          y2={size / 2 + (size / 2) * Math.sin((rotation * Math.PI) / 180)}
          stroke="rgba(34, 197, 94, 0.8)"
          strokeWidth="2"
        />

        {/* Sweep gradient */}
        <defs>
          <radialGradient id="sweepGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34, 197, 94, 0.3)" />
            <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
          </radialGradient>
        </defs>
        
        <path
          d={`M ${size / 2} ${size / 2} L ${size / 2 + (size / 2) * Math.cos(((rotation - 30) * Math.PI) / 180)} ${size / 2 + (size / 2) * Math.sin(((rotation - 30) * Math.PI) / 180)} A ${size / 2} ${size / 2} 0 0 1 ${size / 2 + (size / 2) * Math.cos((rotation * Math.PI) / 180)} ${size / 2 + (size / 2) * Math.sin((rotation * Math.PI) / 180)} Z`}
          fill="url(#sweepGradient)"
        />

        {/* Threat blips */}
        {threats.map((threat) => (
          <circle
            key={threat.id}
            cx={size / 2 + (threat.x * size) / 200}
            cy={size / 2 + (threat.y * size) / 200}
            r="3"
            fill={getBlipColor(threat.type, threat.threat_level)}
            className="animate-pulse"
          />
        ))}
      </svg>

      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};
