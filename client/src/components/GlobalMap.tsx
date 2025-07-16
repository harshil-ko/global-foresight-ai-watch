
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
      <div className="relative w-full aspect-[2/1] bg-slate-900 border border-amber-500/30 rounded-lg overflow-hidden">
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 1000 500" 
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid Pattern Background */}
          <defs>
            <pattern id="tacticalGrid" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(251, 191, 36, 0.2)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tacticalGrid)" />

          {/* Detailed World Map Outlines */}
          <g fill="none" stroke="rgba(251, 191, 36, 0.8)" strokeWidth="1.2">
            
            {/* North America - More detailed */}
            {/* Canada */}
            <path d="M60 40 L120 35 L180 40 L240 45 L280 50 L320 55 L340 70 L330 90 L300 100 L250 95 L200 90 L150 85 L100 80 L70 70 Z" />
            {/* USA */}
            <path d="M70 90 L320 95 L315 130 L310 150 L280 160 L240 155 L180 150 L120 145 L80 140 L75 120 Z" />
            {/* Mexico */}
            <path d="M100 160 L200 165 L180 190 L160 200 L140 195 L120 185 Z" />
            
            {/* South America */}
            <path d="M200 210 L220 205 L240 220 L250 260 L255 300 L260 340 L250 380 L240 400 L220 410 L200 405 L185 390 L180 350 L175 310 L180 270 L190 230 Z" />
            
            {/* Europe - Detailed */}
            {/* Scandinavia */}
            <path d="M480 30 L500 25 L520 35 L525 60 L520 80 L500 85 L485 75 L480 50 Z" />
            {/* UK */}
            <path d="M430 70 L445 65 L450 80 L445 95 L430 100 L420 90 L425 75 Z" />
            {/* Western Europe */}
            <path d="M450 90 L480 85 L520 90 L540 110 L535 130 L520 135 L490 140 L460 135 L445 125 L450 105 Z" />
            {/* Eastern Europe */}
            <path d="M540 80 L580 75 L620 85 L640 100 L635 125 L620 135 L590 140 L560 135 L545 120 L540 100 Z" />
            
            {/* Russia - Large landmass */}
            <path d="M620 50 L720 45 L820 50 L900 55 L950 65 L960 85 L955 110 L940 130 L900 135 L840 140 L780 135 L720 130 L680 125 L650 115 L630 95 L625 75 Z" />
            
            {/* Africa - Detailed */}
            <path d="M460 180 L520 175 L570 185 L590 220 L595 260 L590 300 L580 340 L565 370 L545 390 L520 400 L490 395 L465 385 L450 360 L445 320 L450 280 L455 240 L460 200 Z" />
            
            {/* Middle East */}
            <path d="M560 150 L620 145 L670 155 L680 180 L675 200 L650 210 L620 205 L590 195 L570 180 L565 165 Z" />
            
            {/* Asia - China, India, Southeast Asia */}
            {/* China */}
            <path d="M680 120 L760 115 L820 125 L840 150 L835 180 L820 200 L790 205 L750 200 L710 195 L685 175 L680 145 Z" />
            {/* India */}
            <path d="M650 200 L700 195 L720 220 L715 260 L700 285 L680 290 L660 280 L650 250 L655 225 Z" />
            {/* Southeast Asia */}
            <path d="M720 240 L780 235 L820 250 L840 275 L825 295 L800 300 L770 295 L745 285 L725 270 Z" />
            
            {/* Japan */}
            <path d="M860 160 L880 155 L890 170 L885 185 L870 190 L860 180 Z" />
            
            {/* Australia */}
            <path d="M780 350 L840 345 L880 355 L900 375 L895 395 L875 405 L840 410 L800 405 L775 390 L770 370 Z" />
            
            {/* Additional islands and details */}
            {/* Madagascar */}
            <path d="M590 320 L605 315 L610 340 L605 355 L590 360 L585 345 Z" />
            {/* New Zealand */}
            <path d="M920 400 L935 395 L940 415 L935 430 L920 435 L915 420 Z" />

          </g>

          {/* Conflict Zones with Tactical Highlighting */}
          <g>
            {/* Ukraine - Critical */}
            <circle 
              cx="580" 
              cy="100" 
              r="15"
              fill={getConflictColor('critical')} 
              stroke={getConflictColor('critical')} 
              strokeWidth="3"
              className="animate-pulse cursor-pointer opacity-90 hover:opacity-100"
              onClick={() => handleConflictClick(conflictZones[0])}
              style={{ filter: `drop-shadow(0 0 15px ${getConflictColor('critical')})` }}
            />
            
            {/* Russia - Critical (Multiple zones) */}
            <circle 
              cx="750" 
              cy="90" 
              r="12"
              fill={getConflictColor('critical')} 
              stroke={getConflictColor('critical')} 
              strokeWidth="3"
              className="animate-pulse cursor-pointer opacity-90 hover:opacity-100"
              onClick={() => handleConflictClick(conflictZones[0])}
              style={{ filter: `drop-shadow(0 0 15px ${getConflictColor('critical')})` }}
            />

            {/* Middle East - High */}
            <circle 
              cx="620" 
              cy="175" 
              r="12"
              fill={getConflictColor('high')} 
              stroke={getConflictColor('high')} 
              strokeWidth="3"
              className="animate-pulse cursor-pointer opacity-90 hover:opacity-100"
              onClick={() => handleConflictClick(conflictZones[1])}
              style={{ filter: `drop-shadow(0 0 12px ${getConflictColor('high')})` }}
            />

            {/* South China Sea - Medium */}
            <circle 
              cx="790" 
              cy="240" 
              r="10"
              fill={getConflictColor('medium')} 
              stroke={getConflictColor('medium')} 
              strokeWidth="2"
              className="animate-pulse cursor-pointer opacity-90 hover:opacity-100"
              onClick={() => handleConflictClick(conflictZones[2])}
              style={{ filter: `drop-shadow(0 0 10px ${getConflictColor('medium')})` }}
            />

            {/* Africa Conflicts - Medium */}
            <circle 
              cx="520" 
              cy="280" 
              r="10"
              fill={getConflictColor('medium')} 
              stroke={getConflictColor('medium')} 
              strokeWidth="2"
              className="animate-pulse cursor-pointer opacity-90 hover:opacity-100"
              onClick={() => handleConflictClick(conflictZones[3])}
              style={{ filter: `drop-shadow(0 0 10px ${getConflictColor('medium')})` }}
            />
          </g>

          {/* Tactical Scanning Lines */}
          <defs>
            <linearGradient id="amberscanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0)" />
              <stop offset="50%" stopColor="rgba(251, 191, 36, 0.4)" />
              <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" />
            </linearGradient>
          </defs>
          
          <rect 
            width="100%" 
            height="2" 
            y="125" 
            fill="url(#amberscanGradient)" 
            className="animate-pulse"
          />
          <rect 
            width="100%" 
            height="2" 
            y="250" 
            fill="url(#amberscanGradient)" 
            className="animate-pulse"
            style={{ animationDelay: '1.5s' }}
          />
          <rect 
            width="100%" 
            height="2" 
            y="375" 
            fill="url(#amberscanGradient)" 
            className="animate-pulse"
            style={{ animationDelay: '3s' }}
          />
        </svg>
        
        {/* Tactical HUD Status overlay */}
        <div className="absolute top-3 left-3 text-xs text-amber-400 font-mono bg-black/60 px-2 py-1 border border-amber-500/30">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            GLOBAL CONFLICT MONITOR - ACTIVE
          </div>
        </div>

        {/* Coordinates display */}
        <div className="absolute top-3 right-3 text-xs text-amber-400 font-mono bg-black/60 px-2 py-1 border border-amber-500/30">
          LAT: 0°00'00" LON: 0°00'00"
        </div>
        
        {/* Tactical Legend */}
        <div className="absolute bottom-3 right-3 text-xs text-amber-400 font-mono bg-black/60 px-3 py-2 border border-amber-500/30 space-y-1">
          <div className="text-amber-300 font-bold mb-1">THREAT LEVELS</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse border border-red-300"></div>
            <span>CRITICAL</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse border border-orange-300"></div>
            <span>HIGH</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse border border-yellow-300"></div>
            <span>MEDIUM</span>
          </div>
        </div>

        {/* Corner brackets for tactical HUD feel */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-amber-500/50"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-amber-500/50"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-amber-500/50"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-amber-500/50"></div>
      </div>

      <ConflictDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        conflict={selectedConflict}
      />
    </>
  );
};
