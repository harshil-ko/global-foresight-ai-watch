
import React, { useEffect, useState } from 'react';
import { ConflictDialog } from './ConflictDialog';

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

const conflictZones = [
  {
    id: 'ukraine-russia',
    name: 'RUSSIA-UKRAINE CONFLICT',
    location: 'EASTERN EUROPE',
    x: 15,
    y: -25,
    status: 'active' as const,
    severity: 'critical' as const,
    lastUpdate: '2024-06-25 14:30 UTC',
    casualties: '500K+ ESTIMATED',
    keyDevelopments: [
      'Continued fighting along eastern front lines',
      'International aid packages approved',
      'Diplomatic talks scheduled for next week',
      'Civilian infrastructure targeted in recent attacks'
    ],
    involvedParties: ['UKRAINE', 'RUSSIA', 'NATO ALLIES', 'UN PEACEKEEPERS']
  },
  {
    id: 'middle-east',
    name: 'MIDDLE EAST TENSIONS',
    location: 'MIDDLE EAST',
    x: 25,
    y: 10,
    status: 'escalating' as const,
    severity: 'high' as const,
    lastUpdate: '2024-06-25 12:15 UTC',
    casualties: '50K+ ESTIMATED',
    keyDevelopments: [
      'Cross-border incidents reported',
      'Military exercises in disputed zones',
      'Evacuation of diplomatic personnel',
      'Emergency UN Security Council meeting called'
    ],
    involvedParties: ['REGIONAL POWERS', 'INTERNATIONAL COALITION', 'MILITIA GROUPS']
  },
  {
    id: 'south-china-sea',
    name: 'SOUTH CHINA SEA DISPUTE',
    location: 'SOUTH CHINA SEA',
    x: 70,
    y: 15,
    status: 'active' as const,
    severity: 'medium' as const,
    lastUpdate: '2024-06-25 10:45 UTC',
    casualties: 'MINIMAL REPORTED',
    keyDevelopments: [
      'Naval patrols increased in disputed waters',
      'Fishing vessel incidents reported',
      'Joint military exercises announced',
      'Diplomatic protests filed with international bodies'
    ],
    involvedParties: ['CHINA', 'PHILIPPINES', 'VIETNAM', 'US NAVY', 'ASEAN']
  },
  {
    id: 'african-conflicts',
    name: 'AFRICAN REGIONAL CONFLICTS',
    location: 'CENTRAL AFRICA',
    x: 5,
    y: 35,
    status: 'de-escalating' as const,
    severity: 'medium' as const,
    lastUpdate: '2024-06-25 08:20 UTC',
    casualties: '25K+ ESTIMATED',
    keyDevelopments: [
      'Ceasefire agreement signed',
      'Humanitarian corridors established',
      'Peacekeeping forces deployed',
      'Refugee camps receiving international aid'
    ],
    involvedParties: ['LOCAL MILITIAS', 'GOVERNMENT FORCES', 'UN PEACEKEEPERS', 'AU FORCES']
  }
];

export const RadarDisplay: React.FC<RadarDisplayProps> = ({ 
  threats = [], 
  size = 200 
}) => {
  const [rotation, setRotation] = useState(0);
  const [selectedConflict, setSelectedConflict] = useState<typeof conflictZones[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const getConflictColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ff4444';
      case 'high': return '#ff8800';
      case 'medium': return '#ffff44';
      case 'low': return '#44ff44';
      default: return '#44ff44';
    }
  };

  const handleConflictClick = (conflict: typeof conflictZones[0]) => {
    setSelectedConflict(conflict);
    setIsDialogOpen(true);
  };

  return (
    <>
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

          {/* Interactive Conflict Zone Dots */}
          {conflictZones.map((conflict) => (
            <g key={conflict.id}>
              <circle
                cx={size / 2 + (conflict.x * size) / 100}
                cy={size / 2 + (conflict.y * size) / 100}
                r="6"
                fill={getConflictColor(conflict.severity)}
                stroke={getConflictColor(conflict.severity)}
                strokeWidth="2"
                className="animate-pulse cursor-pointer hover:r-8 transition-all duration-200"
                onClick={() => handleConflictClick(conflict)}
                style={{ filter: `drop-shadow(0 0 8px ${getConflictColor(conflict.severity)})` }}
              />
              <circle
                cx={size / 2 + (conflict.x * size) / 100}
                cy={size / 2 + (conflict.y * size) / 100}
                r="12"
                fill="none"
                stroke={getConflictColor(conflict.severity)}
                strokeWidth="1"
                strokeOpacity="0.3"
                className="animate-ping"
              />
            </g>
          ))}
        </svg>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <ConflictDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        conflict={selectedConflict}
      />
    </>
  );
};
