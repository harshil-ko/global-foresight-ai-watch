import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, TrendingUp, Users, Shield, Zap, Satellite, Radio } from 'lucide-react';

interface ConflictDialogProps {
  isOpen: boolean;
  onClose: () => void;
  conflict: {
    id: string;
    name: string;
    location: string;
    status: 'active' | 'escalating' | 'de-escalating';
    severity: 'low' | 'medium' | 'high' | 'critical';
    lastUpdate: string;
    casualties: string;
    keyDevelopments: string[];
    involvedParties: string[];
  } | null;
}

export const ConflictDialog: React.FC<ConflictDialogProps> = ({ isOpen, onClose, conflict }) => {
  if (!conflict) return null;

  // Enhanced intelligence data based on conflict ID
  const getEnhancedIntelligence = (conflictId: string) => {
    const intelligenceData = {
      '1': {
        militaryAssets: [
          'Advanced AI-powered surveillance drones detected',
          'Electronic warfare capabilities: CONFIRMED',
          'Next-gen stealth aircraft deployment: PROBABLE',
          'Hypersonic missile systems: INTELLIGENCE SUGGESTS PRESENT'
        ],
        technologicalAdvances: [
          'Quantum communication networks operational',
          'Satellite constellation jamming capabilities',
          'Advanced cyber warfare tools deployed',
          'Autonomous weapons systems detected'
        ],
        geopoliticalAnalysis: [
          'Strategic alliance formations accelerating',
          'Resource competition intensifying in region',
          'Diplomatic channels showing strain patterns',
          'Economic sanctions impacting military readiness'
        ],
        threatAssessment: {
          cyberCapability: 'CRITICAL',
          conventionalForces: 'HIGH',
          nuclearReadiness: 'ELEVATED',
          spaceAssets: 'SIGNIFICANT'
        }
      },
      '2': {
        militaryAssets: [
          'Naval fleet modernization program active',
          'Anti-ship missile systems upgraded',
          'Submarine warfare capabilities enhanced',
          'Maritime surveillance network expanded'
        ],
        technologicalAdvances: [
          'Underwater drone swarms deployed',
          'Advanced sonar countermeasures active',
          'Satellite-guided precision munitions',
          'AI-assisted tactical decision systems'
        ],
        geopoliticalAnalysis: [
          'Freedom of navigation operations contested',
          'Trade route security concerns escalating',
          'Regional power balance shifting',
          'International law interpretations diverging'
        ],
        threatAssessment: {
          navalSupremacy: 'HIGH',
          areaDerial: 'MODERATE',
          asymmetricWarfare: 'SIGNIFICANT',
          economicLeverage: 'CRITICAL'
        }
      },
      '3': {
        militaryAssets: [
          'Cyber warfare units at full operational capacity',
          'Information warfare campaigns intensified',
          'Critical infrastructure targeting detected',
          'State-sponsored hacker groups mobilized'
        ],
        technologicalAdvances: [
          'AI-powered disinformation networks active',
          'Advanced persistent threat malware deployed',
          'Quantum encryption breaking attempts',
          'Social media manipulation algorithms enhanced'
        ],
        geopoliticalAnalysis: [
          'Democratic institutions under digital siege',
          'Election interference operations detected',
          'Financial system vulnerabilities exploited',
          'International cooperation frameworks strained'
        ],
        threatAssessment: {
          cyberDomination: 'CRITICAL',
          informationWarfare: 'EXTREME',
          infrastructureRisk: 'HIGH',
          democraticStability: 'AT RISK'
        }
      },
      '4': {
        militaryAssets: [
          'Insurgent tactics evolution documented',
          'IED technology advancement concerning',
          'Urban warfare adaptation observed',
          'Foreign fighter influx continuing'
        ],
        technologicalAdvances: [
          'Commercial drone weaponization increasing',
          'Encrypted communication networks hardened',
          'Social media recruitment sophisticated',
          'Supply chain disruption capabilities growing'
        ],
        geopoliticalAnalysis: [
          'Regional stability deteriorating gradually',
          'Humanitarian crisis compounding security issues',
          'International intervention capabilities limited',
          'Local governance structures fragmenting'
        ],
        threatAssessment: {
          asymmetricCapability: 'MODERATE',
          populationSupport: 'CONTESTED',
          territorialControl: 'FRAGMENTED',
          internationalConcern: 'GROWING'
        }
      }
    };

    return intelligenceData[conflictId as keyof typeof intelligenceData] || intelligenceData['1'];
  };

  const intel = getEnhancedIntelligence(conflict.id);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-900/50 text-red-400 border-red-400/30';
      case 'high': return 'bg-orange-900/50 text-orange-400 border-orange-400/30';
      case 'medium': return 'bg-yellow-900/50 text-yellow-400 border-yellow-400/30';
      case 'low': return 'bg-green-900/50 text-green-400 border-green-400/30';
      default: return 'bg-gray-900/50 text-gray-400 border-gray-400/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'escalating': return 'bg-red-900/50 text-red-400';
      case 'de-escalating': return 'bg-green-900/50 text-green-400';
      case 'active': return 'bg-yellow-900/50 text-yellow-400';
      default: return 'bg-gray-900/50 text-gray-400';
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'critical':
      case 'extreme':
        return 'text-red-400';
      case 'high':
      case 'elevated':
        return 'text-orange-400';
      case 'significant':
      case 'moderate':
        return 'text-yellow-400';
      default:
        return 'text-green-400';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border-green-400/30 text-green-400 font-mono max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-green-400 text-xl font-bold flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {conflict.name}
          </DialogTitle>
          <DialogDescription className="text-green-400/70">
            CLASSIFIED INTELLIGENCE BRIEFING - COMPARTMENTED ACCESS REQUIRED
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Status Overview */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-black/60 border-green-400/30">
              <CardContent className="p-4">
                <div className="text-xs text-green-400/70 mb-1">STATUS</div>
                <Badge className={getStatusColor(conflict.status)}>
                  {conflict.status.toUpperCase()}
                </Badge>
              </CardContent>
            </Card>
            
            <Card className="bg-black/60 border-green-400/30">
              <CardContent className="p-4">
                <div className="text-xs text-green-400/70 mb-1">SEVERITY</div>
                <Badge className={getSeverityColor(conflict.severity)}>
                  {conflict.severity.toUpperCase()}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Location and Last Update */}
          <Card className="bg-black/60 border-green-400/30">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-green-400/70">LOCATION:</span>
                <span className="text-sm">{conflict.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-green-400/70 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  LAST UPDATE:
                </span>
                <span className="text-sm">{conflict.lastUpdate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-green-400/70 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  CASUALTIES:
                </span>
                <span className="text-sm">{conflict.casualties}</span>
              </div>
            </CardContent>
          </Card>

          {/* Military Assets Assessment */}
          <Card className="bg-black/60 border-green-400/30">
            <CardContent className="p-4">
              <div className="text-xs text-green-400/70 mb-3 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                MILITARY ASSETS & CAPABILITIES:
              </div>
              <div className="space-y-2">
                {intel.militaryAssets.map((asset, index) => (
                  <div key={index} className="text-sm border-l-2 border-red-400/30 pl-3 py-1 text-red-400/90">
                    ▪ {asset}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technological Advances */}
          <Card className="bg-black/60 border-blue-400/30">
            <CardContent className="p-4">
              <div className="text-xs text-blue-400/70 mb-3 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                TECHNOLOGICAL ADVANCES:
              </div>
              <div className="space-y-2">
                {intel.technologicalAdvances.map((tech, index) => (
                  <div key={index} className="text-sm border-l-2 border-blue-400/30 pl-3 py-1 text-blue-400/90">
                    ▪ {tech}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Threat Assessment Matrix */}
          <Card className="bg-black/60 border-orange-400/30">
            <CardContent className="p-4">
              <div className="text-xs text-orange-400/70 mb-3 flex items-center gap-1">
                <Satellite className="w-3 h-3" />
                THREAT ASSESSMENT MATRIX:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(intel.threatAssessment).map(([category, level], index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-black/40 rounded border border-orange-400/20">
                    <span className="text-xs uppercase tracking-wide">{category.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className={`text-xs font-bold ${getThreatLevelColor(level)}`}>{level}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geopolitical Analysis */}
          <Card className="bg-black/60 border-purple-400/30">
            <CardContent className="p-4">
              <div className="text-xs text-purple-400/70 mb-3 flex items-center gap-1">
                <Radio className="w-3 h-3" />
                GEOPOLITICAL ANALYSIS:
              </div>
              <div className="space-y-2">
                {intel.geopoliticalAnalysis.map((analysis, index) => (
                  <div key={index} className="text-sm border-l-2 border-purple-400/30 pl-3 py-1 text-purple-400/90">
                    ▪ {analysis}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Involved Parties */}
          <Card className="bg-black/60 border-green-400/30">
            <CardContent className="p-4">
              <div className="text-xs text-green-400/70 mb-2">INVOLVED PARTIES:</div>
              <div className="flex flex-wrap gap-2">
                {conflict.involvedParties.map((party, index) => (
                  <Badge key={index} variant="outline" className="border-green-400/30 text-green-400">
                    {party}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Developments */}
          <Card className="bg-black/60 border-green-400/30">
            <CardContent className="p-4">
              <div className="text-xs text-green-400/70 mb-3 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                RECENT DEVELOPMENTS:
              </div>
              <div className="space-y-2">
                {conflict.keyDevelopments.map((development, index) => (
                  <div key={index} className="text-sm border-l-2 border-green-400/30 pl-3 py-1 text-white">
                    • {development}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
