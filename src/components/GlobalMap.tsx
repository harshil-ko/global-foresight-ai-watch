
import React, { useState } from 'react';
import { ConflictDialog } from './ConflictDialog';

const conflictZones = [
  {
    id: 'ukraine-russia',
    name: 'RUSSIA-UKRAINE CONFLICT',
    location: 'EASTERN EUROPE',
    x: 55, // Percentage position on map
    y: 25,
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
    x: 58,
    y: 40,
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
    x: 82,
    y: 45,
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
    x: 52,
    y: 60,
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

const getConflictColor = (severity: string) => {
  switch (severity) {
    case 'critical': return '#ff4444';
    case 'high': return '#ff8800';
    case 'medium': return '#ffff44';
    case 'low': return '#44ff44';
    default: return '#44ff44';
  }
};

export const GlobalMap: React.FC = () => {
  const [selectedConflict, setSelectedConflict] = useState<typeof conflictZones[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConflictClick = (conflict: typeof conflictZones[0]) => {
    setSelectedConflict(conflict);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="relative w-full aspect-[2/1] bg-black/60 border border-green-400/30 rounded-lg overflow-hidden">
        {/* World map outline using SVG */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 1000 500" 
          preserveAspectRatio="xMidYMid meet"
        >
          {/* World map simplified outline */}
          <g fill="none" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="1">
            {/* North America */}
            <path d="M150 120 L180 100 L220 110 L250 130 L280 140 L300 160 L290 180 L270 190 L240 200 L200 190 L170 170 L150 150 Z" />
            
            {/* South America */}
            <path d="M240 250 L260 240 L280 260 L290 300 L285 350 L270 380 L250 390 L240 380 L235 350 L230 320 L235 280 Z" />
            
            {/* Europe */}
            <path d="M480 120 L520 110 L540 120 L560 130 L570 140 L560 160 L540 170 L520 165 L500 160 L480 150 Z" />
            
            {/* Africa */}
            <path d="M480 200 L520 190 L550 200 L570 220 L580 260 L575 300 L570 340 L560 370 L540 380 L520 375 L500 360 L485 330 L480 290 L475 250 Z" />
            
            {/* Asia */}
            <path d="M580 100 L650 90 L720 100 L780 110 L820 120 L850 140 L840 170 L820 180 L780 175 L720 170 L650 165 L580 160 Z" />
            
            {/* Australia */}
            <path d="M750 350 L800 345 L820 355 L815 375 L800 380 L770 375 L750 365 Z" />
            
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(34, 197, 94, 0.1)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </g>
          
          {/* Conflict zone indicators */}
          {conflictZones.map((conflict) => (
            <g key={conflict.id}>
              {/* Pulsing outer ring */}
              <circle
                cx={conflict.x * 10}
                cy={conflict.y * 5}
                r="15"
                fill="none"
                stroke={getConflictColor(conflict.severity)}
                strokeWidth="2"
                strokeOpacity="0.3"
                className="animate-ping"
              />
              
              {/* Main conflict indicator */}
              <circle
                cx={conflict.x * 10}
                cy={conflict.y * 5}
                r="8"
                fill={getConflictColor(conflict.severity)}
                stroke={getConflictColor(conflict.severity)}
                strokeWidth="2"
                className="animate-pulse cursor-pointer hover:r-10 transition-all duration-200"
                onClick={() => handleConflictClick(conflict)}
                style={{ filter: `drop-shadow(0 0 12px ${getConflictColor(conflict.severity)})` }}
              />
              
              {/* Inner core */}
              <circle
                cx={conflict.x * 10}
                cy={conflict.y * 5}
                r="3"
                fill="white"
                className="animate-pulse"
              />
            </g>
          ))}
          
          {/* Scanning lines effect */}
          <defs>
            <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0)" />
              <stop offset="50%" stopColor="rgba(34, 197, 94, 0.3)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
            </linearGradient>
          </defs>
          <rect 
            width="100%" 
            height="2" 
            y="50" 
            fill="url(#scanGradient)" 
            className="animate-pulse"
          />
          <rect 
            width="100%" 
            height="2" 
            y="150" 
            fill="url(#scanGradient)" 
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <rect 
            width="100%" 
            height="2" 
            y="250" 
            fill="url(#scanGradient)" 
            className="animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </svg>
        
        {/* Status overlay */}
        <div className="absolute top-2 left-2 text-xs text-green-400 font-mono">
          GLOBAL THREAT MAP - LIVE FEED
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-2 right-2 text-xs text-green-400 font-mono space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>CRITICAL</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span>HIGH</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span>MEDIUM</span>
          </div>
        </div>
      </div>

      <ConflictDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        conflict={selectedConflict}
      />
    </>
  );
};
