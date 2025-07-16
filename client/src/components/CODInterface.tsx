import React, { useState, useEffect } from 'react';
import { TacticalHUD } from './TacticalHUD';
import { MilitaryButton } from './MilitaryButton';

import { GlobalMap } from './GlobalMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Satellite, Users, Globe, TrendingUp, AlertTriangle, Zap, Eye, Shield } from 'lucide-react';

const CODInterface: React.FC = () => {
  const [threatLevel, setThreatLevel] = useState(3);
  const [activeThreats, setActiveThreats] = useState(7);
  const [systemStatus, setSystemStatus] = useState<'operational' | 'compromised' | 'critical'>('operational');
  const [selectedPollOption, setSelectedPollOption] = useState<string | null>(null);
  const [pollSubmitted, setPollSubmitted] = useState(false);

  // Daily poll questions - would be AI generated in real implementation
  const dailyPolls = [
    {
      id: 'ww3-blame',
      question: "If WW3 broke out tomorrow, which situation would be to blame?",
      options: [
        { id: 'israel-iran', text: "Israel–Hamas drama turning into an Iran–U.S. showdown", flag: "🇮🇱", votes: 2847 },
        { id: 'ukraine-russia', text: "Putin pressing 'unpause' on the Ukraine grindset", flag: "🇺🇦", votes: 3156 },
        { id: 'china-taiwan', text: "China finally flipping the Taiwan table", flag: "🇨🇳", votes: 1923 },
        { id: 'us-bears', text: "U.S. poking one too many bears (or dragons)", flag: "🇺🇸", votes: 4201 }
      ]
    }
  ];

  const currentPoll = dailyPolls[0]; // In real app, this would be selected based on current date

  const handlePollVote = (optionId: string) => {
    setSelectedPollOption(optionId);
    setPollSubmitted(true);
    // In real app, would send vote to backend
  };

  const getTotalVotes = (poll: typeof currentPoll) => {
    return poll.options.reduce((total, option) => total + option.votes, 0);
  };

  const getVotePercentage = (votes: number, total: number) => {
    return Math.round((votes / total) * 100);
  };

  const recentDevelopments = [
    { time: '14:30', event: 'Eastern Europe: Cyber attack on infrastructure networks detected', severity: 'critical' },
    { time: '12:15', event: 'South China Sea: Increased naval patrols reported', severity: 'high' },
    { time: '10:45', event: 'Middle East: Diplomatic talks scheduled for emergency session', severity: 'medium' },
    { time: '08:20', event: 'Africa: Humanitarian aid corridors established', severity: 'low' },
    { time: '06:00', event: 'Arctic: Surveillance activities increased in disputed zones', severity: 'medium' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <Zap className="w-4 h-4" />;
      case 'medium': return <Eye className="w-4 h-4" />;
      case 'low': return <Shield className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

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
            <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-green-400/30">
              <TabsTrigger value="tactical" className="data-[state=active]:bg-green-900/50 data-[state=active]:text-green-400">
                TACTICAL OVERVIEW
              </TabsTrigger>
              <TabsTrigger value="intel" className="data-[state=active]:bg-green-900/50 data-[state=active]:text-green-400">
                INTELLIGENCE
              </TabsTrigger>
              <TabsTrigger value="polls" className="data-[state=active]:bg-green-900/50 data-[state=active]:text-green-400">
                OPINION POLLS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tactical" className="space-y-6">
              {/* Global Map - Larger and Full Width */}
              <Card className="bg-black/60 border-green-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    GLOBAL CONFLICT MAP
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <GlobalMap />
                </CardContent>
              </Card>

              {/* Recent Developments - Single Column */}
              <Card className="bg-black/60 border-green-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    RECENT TACTICAL DEVELOPMENTS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentDevelopments.map((dev, index) => (
                      <div key={index} className="bg-black/40 border border-green-400/20 rounded p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className={getSeverityColor(dev.severity)}>
                              {getSeverityIcon(dev.severity)}
                            </span>
                            <span className={`${getSeverityColor(dev.severity)} font-mono text-sm font-bold`}>{dev.time}</span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getSeverityColor(dev.severity)} border-current`}
                          >
                            {dev.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-green-400/80 text-sm">{dev.event}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="intel" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-black/60 border-green-400/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                      <Satellite className="w-5 h-5" />
                      INTELLIGENCE BRIEFING
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm max-h-96 overflow-y-auto">
                      <div className="border-l-2 border-red-400 pl-4">
                        <div className="text-red-400 font-bold">PRIORITY ALPHA</div>
                        <div className="text-red-400/70">FLASH: North Korean submarine detected breaching DMZ waters. South Korean naval forces on high alert. Estimated payload: unknown.</div>
                      </div>
                      <div className="border-l-2 border-orange-400 pl-4">
                        <div className="text-orange-400 font-bold">PRIORITY ALPHA</div>
                        <div className="text-orange-400/70">URGENT: Massive cyber infiltration detected across NATO infrastructure. Attack vectors suggest state-sponsored origin. Critical systems isolated.</div>
                      </div>
                      <div className="border-l-2 border-yellow-400 pl-4">
                        <div className="text-yellow-400 font-bold">PRIORITY BRAVO</div>
                        <div className="text-yellow-400/70">Iranian Revolutionary Guard conducting "naval exercises" 12 nautical miles from Strait of Hormuz. Oil tanker traffic rerouted.</div>
                      </div>
                      <div className="border-l-2 border-yellow-400 pl-4">
                        <div className="text-yellow-400 font-bold">PRIORITY BRAVO</div>
                        <div className="text-yellow-400/70">Unconfirmed reports of Wagner Group mercenaries mobilizing in Central African Republic. Mineral extraction sites under surveillance.</div>
                      </div>
                      <div className="border-l-2 border-blue-400 pl-4">
                        <div className="text-blue-400 font-bold">PRIORITY CHARLIE</div>
                        <div className="text-blue-400/70">Chinese military aircraft conducting "routine patrols" within Taiwan's ADIZ for 48th consecutive day. F-16 scrambles increased 300%.</div>
                      </div>
                      <div className="border-l-2 border-blue-400 pl-4">
                        <div className="text-blue-400 font-bold">PRIORITY CHARLIE</div>
                        <div className="text-blue-400/70">Russian troop buildups detected along Finnish border following NATO expansion. Mobile SAM sites repositioned overnight.</div>
                      </div>
                      <div className="border-l-2 border-green-400 pl-4">
                        <div className="text-green-400 font-bold">PRIORITY DELTA</div>
                        <div className="text-green-400/70">Israeli intelligence sources report unusual Hezbollah communications chatter. Rocket stockpile assessments being updated.</div>
                      </div>
                      <div className="border-l-2 border-green-400 pl-4">
                        <div className="text-green-400 font-bold">PRIORITY DELTA</div>
                        <div className="text-green-400/70">Pakistani nuclear facilities experiencing "maintenance shutdowns." IAEA inspectors denied access for 72 hours.</div>
                      </div>
                      <div className="border-l-2 border-purple-400 pl-4">
                        <div className="text-purple-400 font-bold">SIGINT FLASH</div>
                        <div className="text-purple-400/70">Intercepted chatter suggests coordinated disinformation campaign targeting EU elections. Social media bot networks activated across 12 countries.</div>
                      </div>
                      <div className="border-l-2 border-cyan-400 pl-4">
                        <div className="text-cyan-400 font-bold">HUMINT REPORT</div>
                        <div className="text-cyan-400/70">Asset reports unusual diplomatic activity in Moscow. Emergency Kremlin meetings convened at 0300 local time. Subject matter classified.</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/60 border-amber-400/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-amber-400 font-mono flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      BREAKING DEVELOPMENTS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm max-h-96 overflow-y-auto">
                      <div className="bg-red-900/20 border border-red-400/30 p-3 rounded">
                        <div className="text-red-400 font-bold text-xs">🔴 LIVE - 14:23 UTC</div>
                        <div className="text-red-400/80">Emergency UN Security Council session called following reports of chemical weapons deployment in contested territory.</div>
                      </div>
                      <div className="bg-orange-900/20 border border-orange-400/30 p-3 rounded">
                        <div className="text-orange-400 font-bold text-xs">⚠️ DEVELOPING - 13:45 UTC</div>
                        <div className="text-orange-400/80">Major telecommunications blackout across Belarus. Internet traffic down 89%. Cause under investigation.</div>
                      </div>
                      <div className="bg-yellow-900/20 border border-yellow-400/30 p-3 rounded">
                        <div className="text-yellow-400 font-bold text-xs">📡 CONFIRMED - 12:30 UTC</div>
                        <div className="text-yellow-400/80">Satellite imagery confirms new missile installations in disputed island chain. Range estimates suggest strategic capability.</div>
                      </div>
                      <div className="bg-blue-900/20 border border-blue-400/30 p-3 rounded">
                        <div className="text-blue-400 font-bold text-xs">🌐 UPDATE - 11:15 UTC</div>
                        <div className="text-blue-400/80">G7 finance ministers convene emergency session following cryptocurrency market manipulation allegations.</div>
                      </div>
                      <div className="bg-purple-900/20 border border-purple-400/30 p-3 rounded">
                        <div className="text-purple-400 font-bold text-xs">🔍 INTEL - 10:45 UTC</div>
                        <div className="text-purple-400/80">Unusual seismic activity detected near nuclear test sites. Magnitude 4.2 tremor suggests possible underground detonation.</div>
                      </div>
                      <div className="bg-green-900/20 border border-green-400/30 p-3 rounded">
                        <div className="text-green-400 font-bold text-xs">✅ RESOLVED - 09:30 UTC</div>
                        <div className="text-green-400/80">Diplomatic crisis averted following successful back-channel negotiations. Troop withdrawals confirmed via satellite.</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="polls" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <Card className="bg-black/60 border-amber-400/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-amber-400 font-mono flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      DAILY INTELLIGENCE POLL
                    </CardTitle>
                    <div className="text-xs text-amber-400/70 font-mono">
                      AI-GENERATED • CLASSIFIED PERSONNEL ONLY • EXPIRES 23:59 UTC
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-white mb-2">{currentPoll.question}</h3>
                        <div className="text-sm text-gray-400">
                          Total Responses: {getTotalVotes(currentPoll).toLocaleString()}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {currentPoll.options.map((option) => {
                          const totalVotes = getTotalVotes(currentPoll);
                          const percentage = getVotePercentage(option.votes, totalVotes);
                          const isSelected = selectedPollOption === option.id;
                          
                          return (
                            <div key={option.id} className="relative">
                              <button
                                onClick={() => handlePollVote(option.id)}
                                disabled={pollSubmitted}
                                className={`w-full p-4 text-left border rounded-lg transition-all duration-200 ${
                                  pollSubmitted
                                    ? isSelected
                                      ? 'border-green-400 bg-green-900/20'
                                      : 'border-gray-600 bg-gray-900/20'
                                    : 'border-amber-400/30 bg-black/30 hover:border-amber-400 hover:bg-amber-900/10'
                                } ${pollSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <span className="text-2xl">{option.flag}</span>
                                    <div>
                                      <div className="text-white font-medium">{option.text}</div>
                                      {pollSubmitted && (
                                        <div className="text-sm text-gray-400">
                                          {option.votes.toLocaleString()} votes ({percentage}%)
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {isSelected && pollSubmitted && (
                                    <div className="text-green-400 font-bold">✓ VOTED</div>
                                  )}
                                </div>
                                
                                {pollSubmitted && (
                                  <div className="mt-2">
                                    <div className="w-full bg-gray-800 rounded-full h-2">
                                      <div
                                        className={`h-2 rounded-full transition-all duration-500 ${
                                          isSelected ? 'bg-green-400' : 'bg-amber-400'
                                        }`}
                                        style={{ width: `${percentage}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {!pollSubmitted && (
                        <div className="text-center text-sm text-gray-400 font-mono">
                          SELECT AN OPTION TO SUBMIT YOUR CLASSIFIED ASSESSMENT
                        </div>
                      )}

                      {pollSubmitted && (
                        <div className="text-center">
                          <div className="inline-block bg-green-900/30 border border-green-400/50 rounded px-4 py-2">
                            <div className="text-green-400 font-mono text-sm">
                              ✓ RESPONSE LOGGED • THANK YOU FOR YOUR ASSESSMENT
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="border-t border-gray-600 pt-4">
                        <div className="text-xs text-gray-500 font-mono text-center">
                          NEXT POLL GENERATES AT 00:00 UTC • AI-CURATED SCENARIOS • HUMOR LEVEL: DARK
                        </div>
                      </div>
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
