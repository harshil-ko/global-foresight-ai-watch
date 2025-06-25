
import React, { useEffect, useState } from 'react';
import { AlertTriangle, Shield, Skull } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThreatIndicatorProps {
  level: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  type: string;
  confidence: number;
}

export const ThreatIndicator: React.FC<ThreatIndicatorProps> = ({
  level,
  location,
  type,
  confidence
}) => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (level === 'critical') {
      const interval = setInterval(() => {
        setBlink(prev => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [level]);

  const getLevelConfig = () => {
    switch (level) {
      case 'low':
        return {
          color: 'text-green-400',
          bgColor: 'bg-green-900/20',
          borderColor: 'border-green-400',
          icon: Shield
        };
      case 'medium':
        return {
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-900/20',
          borderColor: 'border-yellow-400',
          icon: AlertTriangle
        };
      case 'high':
        return {
          color: 'text-orange-400',
          bgColor: 'bg-orange-900/20',
          borderColor: 'border-orange-400',
          icon: AlertTriangle
        };
      case 'critical':
        return {
          color: 'text-red-400',
          bgColor: 'bg-red-900/20',
          borderColor: 'border-red-400',
          icon: Skull
        };
      default:
        return {
          color: 'text-green-400',
          bgColor: 'bg-green-900/20',
          borderColor: 'border-green-400',
          icon: Shield
        };
    }
  };

  const config = getLevelConfig();
  const Icon = config.icon;

  return (
    <div className={cn(
      "relative border-2 backdrop-blur-sm font-mono text-sm p-3",
      config.bgColor,
      config.borderColor,
      config.color,
      level === 'critical' && blink && "opacity-50"
    )}>
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-current"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-current"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-current"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-current"></div>

      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 mt-0.5" />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold uppercase">{level}</span>
            <span className="text-xs opacity-70">{confidence}% CONF</span>
          </div>
          <div className="text-xs space-y-1">
            <div>LOC: {location}</div>
            <div>TYPE: {type}</div>
          </div>
        </div>
      </div>

      {/* Scanning effect for critical threats */}
      {level === 'critical' && (
        <div className="absolute inset-0 border-2 border-current animate-pulse"></div>
      )}
    </div>
  );
};
