
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
        {/* World map outline using accurate SVG */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 1000 500" 
          preserveAspectRatio="xMidYMid meet"
        >
          {/* World map accurate outline */}
          <g fill="none" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="1.5">
            {/* North America */}
            <path d="M80 80 L90 70 L110 65 L130 70 L150 75 L170 80 L190 85 L210 90 L230 100 L250 110 L270 120 L280 140 L275 160 L270 180 L260 200 L240 210 L220 205 L200 200 L180 190 L160 185 L140 180 L120 175 L100 170 L85 160 L80 140 L75 120 L80 100 Z" />
            
            {/* Greenland */}
            <path d="M280 40 L300 35 L320 40 L315 60 L310 80 L300 85 L285 80 L280 60 Z" />
            
            {/* South America */}
            <path d="M220 240 L240 235 L260 240 L275 250 L285 270 L290 300 L295 330 L290 360 L285 390 L275 420 L260 440 L245 445 L230 440 L220 430 L215 410 L210 390 L205 370 L200 350 L195 330 L200 310 L205 290 L210 270 L215 250 Z" />
            
            {/* Europe */}
            <path d="M480 100 L500 95 L520 100 L540 105 L560 110 L580 115 L590 130 L585 145 L580 160 L570 170 L555 175 L540 170 L525 165 L510 160 L495 155 L485 145 L480 130 L475 115 Z" />
            
            {/* Africa */}
            <path d="M480 180 L500 175 L520 180 L540 185 L560 195 L575 210 L585 230 L590 250 L595 270 L590 290 L585 310 L580 330 L575 350 L570 370 L560 385 L545 395 L530 400 L515 395 L500 390 L485 380 L475 365 L470 350 L465 335 L460 320 L465 305 L470 290 L475 275 L480 260 L485 245 L490 230 L485 215 L480 200 Z" />
            
            {/* Asia - Russia and China */}
            <path d="M580 80 L620 75 L660 80 L700 85 L740 90 L780 95 L820 100 L860 105 L900 110 L920 125 L915 140 L910 155 L900 170 L885 180 L870 185 L855 180 L840 175 L825 170 L810 165 L795 160 L780 155 L765 150 L750 145 L735 140 L720 135 L705 130 L690 125 L675 120 L660 115 L645 110 L630 105 L615 100 L600 95 L585 90 Z" />
            
            {/* India */}
            <path d="M650 200 L670 195 L690 200 L710 210 L720 225 L725 240 L720 255 L710 270 L695 280 L680 275 L665 270 L655 255 L650 240 L645 225 L650 210 Z" />
            
            {/* Southeast Asia */}
            <path d="M730 250 L750 245 L770 250 L790 260 L810 270 L825 285 L820 300 L815 315 L805 325 L790 320 L775 315 L760 310 L745 305 L735 295 L730 280 L725 265 Z" />
            
            {/* Australia */}
            <path d="M750 350 L780 345 L810 350 L835 360 L850 375 L845 390 L835 400 L820 405 L805 400 L790 395 L775 390 L760 385 L750 375 L745 365 Z" />
            
            {/* Japan */}
            <path d="M850 180 L860 175 L870 180 L875 190 L870 200 L860 205 L850 200 L845 190 Z" />
            
            {/* UK and Ireland */}
            <path d="M450 120 L460 115 L470 120 L465 130 L460 135 L450 130 Z" />
            
            {/* Madagascar */}
            <path d="M580 340 L590 335 L595 345 L590 355 L580 350 Z" />
            
            {/* New Zealand */}
            <path d="M900 380 L910 375 L915 385 L910 395 L900 390 Z" />
            
            {/* Grid overlay */}
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
                r="20"
                fill="none"
                stroke={getConflictColor(conflict.severity)}
                strokeWidth="2"
                strokeOpacity="0.4"
                className="animate-ping"
              />
              
              {/* Secondary pulsing ring */}
              <circle
                cx={conflict.x * 10}
                cy={conflict.y * 5}
                r="15"
                fill="none"
                stroke={getConflictColor(conflict.severity)}
                strokeWidth="1.5"
                strokeOpacity="0.6"
                className="animate-pulse"
                style={{ animationDelay: '0.5s' }}
              />
              
              {/* Main conflict indicator with enhanced blinking */}
              <circle
                cx={conflict.x * 10}
                cy={conflict.y * 5}
                r="8"
                fill={getConflictColor(conflict.severity)}
                stroke={getConflictColor(conflict.severity)}
                strokeWidth="2"
                className="animate-pulse cursor-pointer hover:r-10 transition-all duration-200"
                onClick={() => handleConflictClick(conflict)}
                style={{ 
                  filter: `drop-shadow(0 0 12px ${getConflictColor(conflict.severity)})`,
                  animation: `pulse 1.5s ease-in-out infinite alternate`
                }}
              />
              
              {/* Inner core with blinking */}
              <circle
                cx={conflict.x * 10}
                cy={conflict.y * 5}
                r="3"
                fill="white"
                className="animate-pulse"
                style={{ 
                  animation: `pulse 1s ease-in-out infinite`,
                  animationDelay: '0.25s'
                }}
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
