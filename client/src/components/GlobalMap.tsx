
import React, { useState } from 'react';
import { ConflictDialog } from './ConflictDialog';

const conflictZones = [
  {
    id: 'ukraine-russia',
    name: 'RUSSIA-UKRAINE CONFLICT',
    location: 'EASTERN EUROPE',
    x: 55,
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
    involvedParties: ['UKRAINE', 'RUSSIA', 'NATO ALLIES', 'UN PEACEKEEPERS'],
    countries: ['ukraine', 'russia']
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
    involvedParties: ['REGIONAL POWERS', 'INTERNATIONAL COALITION', 'MILITIA GROUPS'],
    countries: ['syria', 'iraq', 'iran']
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
    involvedParties: ['CHINA', 'PHILIPPINES', 'VIETNAM', 'US NAVY', 'ASEAN'],
    countries: ['china', 'philippines', 'vietnam']
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
    involvedParties: ['LOCAL MILITIAS', 'GOVERNMENT FORCES', 'UN PEACEKEEPERS', 'AU FORCES'],
    countries: ['sudan', 'ethiopia', 'somalia']
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
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 800 400" 
          preserveAspectRatio="xMidYMid meet"
        >
          {/* World Map Base - Simplified but recognizable continents */}
          <g fill="none" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="1.5">
            
            {/* North America */}
            <path d="M50 80 Q70 60 120 70 Q160 75 180 90 Q200 100 190 130 Q180 160 150 170 Q100 175 80 150 Q50 120 50 80 Z" />
            
            {/* South America */}
            <path d="M150 200 Q170 190 180 220 Q185 260 190 300 Q185 340 170 360 Q155 365 145 350 Q135 320 140 290 Q145 250 150 200 Z" />
            
            {/* Europe (Base) */}
            <path d="M350 80 Q380 75 420 85 Q450 90 460 110 Q455 130 430 135 Q400 140 370 130 Q350 120 350 80 Z" />
            
            {/* Africa */}
            <path d="M380 160 Q420 155 450 170 Q470 200 465 240 Q460 280 445 320 Q425 350 400 355 Q375 350 365 320 Q360 280 365 240 Q370 200 380 160 Z" />
            
            {/* Asia Base */}
            <path d="M480 90 Q550 85 620 95 Q680 100 720 110 Q750 120 740 150 Q730 180 700 185 Q650 190 600 185 Q550 180 520 170 Q480 150 480 90 Z" />
            
            {/* Australia */}
            <path d="M580 280 Q620 275 650 285 Q680 295 675 315 Q670 335 640 340 Q610 345 580 335 Q565 325 580 280 Z" />

          </g>

          {/* Conflict Zones with Clear Highlighting */}
          <g>
            {/* Ukraine - Critical */}
            <path 
              d="M420 85 Q440 80 460 90 Q465 100 455 110 Q435 115 420 105 Q415 95 420 85 Z" 
              fill={getConflictColor('critical')} 
              stroke={getConflictColor('critical')} 
              strokeWidth="2"
              className="animate-pulse cursor-pointer opacity-90 hover:opacity-100"
              onClick={() => handleConflictClick(conflictZones[0])}
              style={{ filter: `drop-shadow(0 0 10px ${getConflictColor('critical')})` }}
            />
            
            {/* Russia - Critical */}
            <path 
              d="M480 90 Q520 85 580 95 Q620 100 640 110 Q650 120 630 140 Q600 145 560 140 Q520 135 490 130 Q480 120 480 90 Z" 
              fill={getConflictColor('critical')} 
              stroke={getConflictColor('critical')} 
              strokeWidth="2"
              className="animate-pulse cursor-pointer opacity-90 hover:opacity-100"
              onClick={() => handleConflictClick(conflictZones[0])}
              style={{ filter: `drop-shadow(0 0 10px ${getConflictColor('critical')})` }}
            />

            {/* Middle East - High */}
            <path 
              d="M450 130 Q480 125 510 135 Q520 145 510 160 Q485 165 460 160 Q450 150 450 130 Z" 
              fill={getConflictColor('high')} 
              stroke={getConflictColor('high')} 
              strokeWidth="2"
              className="animate-pulse cursor-pointer opacity-90 hover:opacity-100"
              onClick={() => handleConflictClick(conflictZones[1])}
              style={{ filter: `drop-shadow(0 0 8px ${getConflictColor('high')})` }}
            />

            {/* South China Sea - Medium */}
            <path 
              d="M620 160 Q650 155 680 170 Q685 185 675 200 Q645 205 620 195 Q615 180 620 160 Z" 
              fill={getConflictColor('medium')} 
              stroke={getConflictColor('medium')} 
              strokeWidth="2"
              className="animate-pulse cursor-pointer opacity-90 hover:opacity-100"
              onClick={() => handleConflictClick(conflictZones[2])}
              style={{ filter: `drop-shadow(0 0 6px ${getConflictColor('medium')})` }}
            />

            {/* Africa Conflicts - Medium */}
            <path 
              d="M420 220 Q450 215 470 230 Q475 250 465 270 Q440 275 420 265 Q415 245 420 220 Z" 
              fill={getConflictColor('medium')} 
              stroke={getConflictColor('medium')} 
              strokeWidth="2"
              className="animate-pulse cursor-pointer opacity-90 hover:opacity-100"
              onClick={() => handleConflictClick(conflictZones[3])}
              style={{ filter: `drop-shadow(0 0 6px ${getConflictColor('medium')})` }}
            />
          </g>

          {/* Grid overlay */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34, 197, 94, 0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

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
            height="3" 
            y="100" 
            fill="url(#scanGradient)" 
            className="animate-pulse"
          />
          <rect 
            width="100%" 
            height="3" 
            y="200" 
            fill="url(#scanGradient)" 
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <rect 
            width="100%" 
            height="3" 
            y="300" 
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
            <div className="w-3 h-3 bg-red-500 rounded-sm animate-pulse"></div>
            <span>CRITICAL</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-sm animate-pulse"></div>
            <span>HIGH</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-sm animate-pulse"></div>
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
