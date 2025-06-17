
import React from 'react';
import { Battery, BatteryLow, Zap } from 'lucide-react';

interface BatteryIndicatorProps {
  batteryLevel: number;
  isRunning: boolean;
}

const BatteryIndicator = ({ batteryLevel, isRunning }: BatteryIndicatorProps) => {
  const getBatteryColor = () => {
    if (batteryLevel > 50) return '#00ff00';
    if (batteryLevel > 20) return '#ffff00';
    return '#ff0000';
  };

  const getBatteryIcon = () => {
    if (batteryLevel < 20) return BatteryLow;
    return Battery;
  };

  const BatteryIcon = getBatteryIcon();

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <div className="absolute inset-0 rounded-full tron-border bg-gray-900/50 backdrop-blur-sm">
          {/* Battery level ring */}
          <svg className="absolute inset-3 md:inset-4 w-42 h-42 md:w-56 md:h-56 transform -rotate-90" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="batteryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={getBatteryColor()} />
                <stop offset="100%" stopColor={getBatteryColor() + '66'} />
              </linearGradient>
            </defs>
            
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="8"
            />
            
            {/* Battery level circle */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="url(#batteryGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(batteryLevel / 100) * 440} 440`}
              className={`transition-all duration-1000 ${isRunning ? 'animate-pulse' : ''}`}
            />
            
            {/* Percentage markings */}
            {[0, 25, 50, 75, 100].map((mark) => {
              const angle = (mark / 100) * 360;
              const x1 = 100 + 55 * Math.cos((angle * Math.PI) / 180);
              const y1 = 100 + 55 * Math.sin((angle * Math.PI) / 180);
              const x2 = 100 + 65 * Math.cos((angle * Math.PI) / 180);
              const y2 = 100 + 65 * Math.sin((angle * Math.PI) / 180);
              
              return (
                <line
                  key={mark}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#00d4ff"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
          
          {/* Center display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <BatteryIcon 
              className={`w-6 h-6 md:w-8 md:h-8 mb-2`} 
              style={{ color: getBatteryColor() }}
            />
            <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: getBatteryColor() }}>
              {batteryLevel.toFixed(0)}%
            </div>
            <div className="text-xs text-neon-cyan">BATTERY</div>
            {isRunning && (
              <div className="flex items-center mt-2 text-xs text-neon-orange">
                <Zap className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                CONSUMING
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-3 space-y-2 w-full max-w-xs">
        <div className="tron-border rounded-lg p-2 md:p-3 bg-gray-900/50 backdrop-blur-sm">
          <div className="text-neon-cyan text-xs text-center mb-2">POWER STATUS</div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Voltage:</span>
            <span className="text-xs md:text-sm text-white">48V</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-400">Current:</span>
            <span className="text-xs md:text-sm text-white">{isRunning ? '24.1A' : '0.0A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryIndicator;
