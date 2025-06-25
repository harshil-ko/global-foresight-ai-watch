
import React, { useState, useEffect } from 'react';
import { TacticalHUD } from './TacticalHUD';
import { MilitaryButton } from './MilitaryButton';
import { ThreatIndicator } from './ThreatIndicator';
import { RadarDisplay } from './RadarDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Satellite, Radio, Users, Globe } from 'lucide-react';

const CODInterface: React.FC = () => {
  const [threatLevel, setThreatLevel] = useState(3);
  const [activeThreats, setActiveThreats] = useState(7);
  const [systemStatus, setSystemStatus] = useState<'operational' | 'compromised' | 'critical'>('operational');

  const mockThreats: Array<{
    id: string;
    x: number;
    y: number;
    type: 'aircraft' | 'naval' | 'ground' | 'cyber';
    threat_level: string;
  }> = [
    { id: '1', x: 30, y: -20, type: 'aircraft', threat_level: 'high' },
    { id: '2', x: -40, y: 50, type: 'naval', threat_level: 'medium' },
    { id: '3', x: 60, y: 30, type: 'cyber', threat_level: 'critical' },
    { id: '4', x: -20, y: -60, type: 'ground', threat_level: 'low' },
  ];

  const threatCards = [
    { level: 'critical' as const, location: 'EASTERN EUROPE', type: 'CYBER ATTACK', confidence: 94 },
    { level: 'high' as const, location: 'SOUTH CHINA SEA', type: 'NAVAL BUILDUP', confidence: 87 },
    { level: 'medium' as const, location: 'MIDDLE EAST', type: 'INSURGENT ACTIVITY', confidence: 73 },
    { level: 'low' as const, location: 'ARCTIC CIRCLE', type: 'SURVEILLANCE', confidence: 56 },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <TacticalHUD 
        threatLevel={threatLevel}
        activeThreats={activeThreats}
        systemStatus={systemStatus}
      />

      <div className="relative z-10 pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center mb-2 tracking-wider">
              GEOPOLITICAL INTELLIGENCE CENTER
            </h1>
            <p className="text-center text-green-400/70 tracking-widest">
              CLASSIFIED - EYES ONLY
            </p>
          </div>

          <Tabs defaultValue="tactical" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/50 border border-green-400/30">
              <TabsTrigger value="tactical" className="data-[state=active]:bg-green-900/50 data-[state=active]:text-green-400">
                TACTICAL OVERVIEW
              </TabsTrigger>
              <TabsTrigger value="threats" className="data-[state=active]:bg-green-900/50 data-[state=active]:text-green-400">
                THREAT ANALYSIS
              </TabsTrigger>
              <TabsTrigger value="intel" className="data-[state=active]:bg-green-900/50 data-[state=active]:text-green-400">
                INTELLIGENCE
              </TabsTrigger>
              <TabsTrigger value="ops" className="data-[state=active]:bg-green-900/50 data-[state=active]:text-green-400">
                OPERATIONS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tactical" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Radar Display */}
                <Card className="bg-black/60 border-green-400/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                      <Radio className="w-5 h-5" />
                      RADAR SWEEP
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <RadarDisplay threats={mockThreats} size={250} />
                  </CardContent>
                </Card>

                {/* Global Status */}
                <Card className="bg-black/60 border-green-400/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      GLOBAL STATUS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>DEFCON LEVEL</span>
                      <Badge variant="destructive" className="bg-red-900/50 text-red-400">
                        {threatLevel}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>ACTIVE THREATS</span>
                      <Badge variant="secondary" className="bg-yellow-900/50 text-yellow-400">
                        {activeThreats}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>SYSTEM STATUS</span>
                      <Badge variant="default" className="bg-green-900/50 text-green-400">
                        {systemStatus.toUpperCase()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Command Center */}
                <Card className="bg-black/60 border-green-400/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      COMMAND CENTER
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <MilitaryButton variant="primary" className="w-full">
                      ENGAGE PROTOCOLS
                    </MilitaryButton>
                    <MilitaryButton variant="secondary" className="w-full">
                      SATELLITE UPLINK
                    </MilitaryButton>
                    <MilitaryButton variant="danger" className="w-full">
                      EMERGENCY ALERT
                    </MilitaryButton>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="threats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {threatCards.map((threat, index) => (
                  <ThreatIndicator
                    key={index}
                    level={threat.level}
                    location={threat.location}
                    type={threat.type}
                    confidence={threat.confidence}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="intel" className="space-y-6">
              <Card className="bg-black/60 border-green-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                    <Satellite className="w-5 h-5" />
                    INTELLIGENCE BRIEFING
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="border-l-2 border-green-400 pl-4">
                      <div className="text-green-400 font-bold">PRIORITY ALPHA</div>
                      <div className="text-green-400/70">Increased cyber activity detected in Eastern European networks. Recommend immediate defensive posture.</div>
                    </div>
                    <div className="border-l-2 border-yellow-400 pl-4">
                      <div className="text-yellow-400 font-bold">PRIORITY BRAVO</div>
                      <div className="text-yellow-400/70">Naval fleet movements observed in contested waters. Monitoring for escalation patterns.</div>
                    </div>
                    <div className="border-l-2 border-blue-400 pl-4">
                      <div className="text-blue-400 font-bold">PRIORITY CHARLIE</div>
                      <div className="text-blue-400/70">Diplomatic channels report increased tensions. Recommend continued surveillance.</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ops" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-black/60 border-green-400/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-green-400 font-mono text-sm">
                      OPERATION NIGHTWATCH
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs space-y-2">
                      <div>STATUS: ACTIVE</div>
                      <div>PERSONNEL: 12</div>
                      <div>LOCATION: CLASSIFIED</div>
                      <Badge variant="default" className="bg-green-900/50 text-green-400 mt-2">
                        OPERATIONAL
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-black/60 border-yellow-400/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-yellow-400 font-mono text-sm">
                      OPERATION SENTINEL
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs space-y-2">
                      <div>STATUS: STANDBY</div>
                      <div>PERSONNEL: 8</div>
                      <div>LOCATION: CLASSIFIED</div>
                      <Badge variant="secondary" className="bg-yellow-900/50 text-yellow-400 mt-2">
                        READY
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/60 border-red-400/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-red-400 font-mono text-sm">
                      OPERATION PHOENIX
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs space-y-2">
                      <div>STATUS: CRITICAL</div>
                      <div>PERSONNEL: 15</div>
                      <div>LOCATION: CLASSIFIED</div>
                      <Badge variant="destructive" className="bg-red-900/50 text-red-400 mt-2">
                        URGENT
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CODInterface;
