
import React, { useEffect, useState } from 'react';
import { Shield, Target, Zap, AlertTriangle, Crosshair } from 'lucide-react';

interface TacticalHUDProps {
  threatLevel: number;
  activeThreats: number;
  systemStatus: 'operational' | 'compromised' | 'critical';
}

export const TacticalHUD: React.FC<TacticalHUDProps> = ({
  threatLevel,
  activeThreats,
  systemStatus
}) => {
  const [scanLine, setScanLine] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);

    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(scanInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const getStatusColor = () => {
    switch (systemStatus) {
      case 'operational': return 'text-green-400';
      case 'compromised': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-green-400';
    }
  };

  return (
    <div className="tactical-hud fixed inset-0 pointer-events-none z-50">
      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-green-400 opacity-60"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-green-400 opacity-60"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-green-400 opacity-60"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-green-400 opacity-60"></div>

      {/* Top HUD Bar */}
      <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-b border-green-400/30">
        <div className="flex justify-between items-center p-4 text-green-400 font-mono text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>DEFENSE GRID</span>
              <div className={`w-2 h-2 rounded-full ${systemStatus === 'operational' ? 'bg-green-400' : systemStatus === 'compromised' ? 'bg-yellow-400' : 'bg-red-400'} animate-pulse`}></div>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>THREATS: {activeThreats}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>ALERT LVL: {threatLevel}</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <span className={getStatusColor()}>{systemStatus.toUpperCase()}</span>
            <span>{time.toLocaleTimeString()}</span>
            <span>{time.toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Crosshair className="w-8 h-8 text-green-400 opacity-30" />
      </div>

      {/* Scanning line effect */}
      <div 
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-40 transition-all duration-50"
        style={{ top: `${scanLine}%` }}
      ></div>

      {/* Bottom status indicators */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-t border-green-400/30">
        <div className="flex justify-between items-center p-2 text-green-400 font-mono text-xs">
          <div className="flex space-x-4">
            <span>SATCOM: ACTIVE</span>
            <span>SIGINT: ONLINE</span>
            <span>HUMINT: OPERATIONAL</span>
          </div>
          <div className="flex space-x-4">
            <span>CPU: 78%</span>
            <span>MEM: 64%</span>
            <span>NET: 92%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
