
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, TrendingUp, Users } from 'lucide-react';

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border-green-400/30 text-green-400 font-mono max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-green-400 text-xl font-bold flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {conflict.name}
          </DialogTitle>
          <DialogDescription className="text-green-400/70">
            CLASSIFIED INTELLIGENCE BRIEFING
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

          {/* Key Developments */}
          <Card className="bg-black/60 border-green-400/30">
            <CardContent className="p-4">
              <div className="text-xs text-green-400/70 mb-3 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                RECENT DEVELOPMENTS:
              </div>
              <div className="space-y-2">
                {conflict.keyDevelopments.map((development, index) => (
                  <div key={index} className="text-sm border-l-2 border-green-400/30 pl-3 py-1">
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
