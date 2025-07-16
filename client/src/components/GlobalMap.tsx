
import React, { useState } from 'react';
import { ConflictDialog } from './ConflictDialog';
import tacticalWorldMap from '../assets/tactical-world-map.png';

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
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });

  const handleConflictClick = (conflict: typeof conflictZones[0]) => {
    setSelectedConflict(conflict);
    setIsDialogOpen(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    
    // Convert normalized coordinates to lat/lon
    // World map projection: longitude -180 to 180, latitude 85 to -85 (Mercator-like)
    const longitude = (x * 360) - 180;
    const latitude = 85 - (y * 170);
    
    setCoordinates({
      lat: Math.round(latitude * 100) / 100,
      lon: Math.round(longitude * 100) / 100
    });
  };

  const formatCoordinate = (value: number, isLat: boolean) => {
    const abs = Math.abs(value);
    const degrees = Math.floor(abs);
    const minutes = Math.floor((abs - degrees) * 60);
    const seconds = Math.floor(((abs - degrees) * 60 - minutes) * 60);
    const direction = isLat ? (value >= 0 ? 'N' : 'S') : (value >= 0 ? 'E' : 'W');
    return `${degrees}°${minutes.toString().padStart(2, '0')}'${seconds.toString().padStart(2, '0')}"${direction}`;
  };

  return (
    <>
      <div 
        className="relative w-full h-[500px] bg-slate-900 border border-amber-500/30 rounded-lg overflow-hidden cursor-crosshair"
        onMouseMove={handleMouseMove}
      >
        {/* Base tactical world map image */}
        <img 
          src={tacticalWorldMap}
          alt="Tactical World Map"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay for conflict zones */}
        <div className="absolute inset-0 w-full h-full">
          {/* Ukraine - Critical (Eastern Europe) */}
          <div 
            className="absolute w-4 h-4 cursor-pointer"
            style={{ left: '55%', top: '25%' }}
            onClick={() => handleConflictClick(conflictZones[0])}
          >
            <div 
              className="w-full h-full rounded-full animate-pulse opacity-90 hover:opacity-100"
              style={{ 
                backgroundColor: getConflictColor('critical'),
                boxShadow: `0 0 15px ${getConflictColor('critical')}`,
                border: `2px solid ${getConflictColor('critical')}`
              }}
            ></div>
          </div>

          {/* Middle East - High */}
          <div 
            className="absolute w-3 h-3 cursor-pointer"
            style={{ left: '58%', top: '40%' }}
            onClick={() => handleConflictClick(conflictZones[1])}
          >
            <div 
              className="w-full h-full rounded-full animate-pulse opacity-90 hover:opacity-100"
              style={{ 
                backgroundColor: getConflictColor('high'),
                boxShadow: `0 0 12px ${getConflictColor('high')}`,
                border: `2px solid ${getConflictColor('high')}`
              }}
            ></div>
          </div>

          {/* South China Sea - Medium */}
          <div 
            className="absolute w-3 h-3 cursor-pointer"
            style={{ left: '82%', top: '45%' }}
            onClick={() => handleConflictClick(conflictZones[2])}
          >
            <div 
              className="w-full h-full rounded-full animate-pulse opacity-90 hover:opacity-100"
              style={{ 
                backgroundColor: getConflictColor('medium'),
                boxShadow: `0 0 10px ${getConflictColor('medium')}`,
                border: `2px solid ${getConflictColor('medium')}`
              }}
            ></div>
          </div>

          {/* Africa Conflicts - Medium */}
          <div 
            className="absolute w-3 h-3 cursor-pointer"
            style={{ left: '52%', top: '60%' }}
            onClick={() => handleConflictClick(conflictZones[3])}
          >
            <div 
              className="w-full h-full rounded-full animate-pulse opacity-90 hover:opacity-100"
              style={{ 
                backgroundColor: getConflictColor('medium'),
                boxShadow: `0 0 10px ${getConflictColor('medium')}`,
                border: `2px solid ${getConflictColor('medium')}`
              }}
            ></div>
          </div>
        </div>
        
        {/* Tactical HUD Status overlay */}
        <div className="absolute top-3 left-3 text-xs text-amber-400 font-mono bg-black/80 px-2 py-1 border border-amber-500/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            GLOBAL CONFLICT MONITOR - ACTIVE
          </div>
        </div>

        {/* Coordinates display */}
        <div className="absolute top-3 right-3 text-xs text-amber-400 font-mono bg-black/80 px-2 py-1 border border-amber-500/50">
          LAT: {formatCoordinate(coordinates.lat, true)} LON: {formatCoordinate(coordinates.lon, false)}
        </div>
        
        {/* Mini Radar Display */}
        <div className="absolute bottom-16 left-3 w-24 h-24">
          <div className="relative w-full h-full bg-black/80 border border-green-400/50 rounded-full">
            {/* Radar Grid */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {/* Concentric circles */}
              <div className="absolute inset-2 border border-green-400/30 rounded-full"></div>
              <div className="absolute inset-4 border border-green-400/20 rounded-full"></div>
              
              {/* Cross lines */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-green-400/30 transform -translate-y-px"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-400/30 transform -translate-x-px"></div>
              
              {/* Rotating sweep line */}
              <div className="absolute top-1/2 left-1/2 w-px h-1/2 bg-gradient-to-t from-green-400 to-transparent transform-gpu origin-bottom animate-spin">
                <div className="absolute top-0 left-1/2 w-1 h-1 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              {/* Threat blips */}
              <div className="absolute top-1/3 left-2/3 w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
              <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
            
            {/* Radar Label */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-green-400 font-mono">
              RADAR
            </div>
          </div>
        </div>

        {/* Tactical Legend */}
        <div className="absolute bottom-3 right-3 text-xs text-amber-400 font-mono bg-black/80 px-3 py-2 border border-amber-500/50 space-y-1">
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
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-amber-500/60"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-amber-500/60"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-amber-500/60"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-amber-500/60"></div>
      </div>

      <ConflictDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        conflict={selectedConflict}
      />
    </>
  );
};
