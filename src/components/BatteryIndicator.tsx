
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
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 rounded-full tron-border bg-gray-900/50 backdrop-blur-sm">
          {/* Battery level ring */}
          <svg className="absolute inset-4 w-56 h-56 transform -rotate-90" viewBox="0 0 200 200">
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
              strokeWidth="12"
            />
            
            {/* Battery level circle */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="url(#batteryGradient)"
              strokeWidth="10"
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
              className={`w-8 h-8 mb-2`} 
              style={{ color: getBatteryColor() }}
            />
            <div className="text-3xl font-bold mb-1" style={{ color: getBatteryColor() }}>
              {batteryLevel.toFixed(0)}%
            </div>
            <div className="text-sm text-neon-cyan">BATTERY</div>
            {isRunning && (
              <div className="flex items-center mt-2 text-xs text-neon-orange">
                <Zap className="w-3 h-3 mr-1" />
                CONSUMING
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-2 w-full max-w-xs">
        <div className="tron-border rounded-lg p-3 bg-gray-900/50 backdrop-blur-sm">
          <div className="text-neon-cyan text-sm text-center mb-2">POWER STATUS</div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Voltage:</span>
            <span className="text-sm text-white">{(48 + batteryLevel * 0.12).toFixed(1)}V</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-400">Current:</span>
            <span className="text-sm text-white">{isRunning ? '12.5A' : '0.0A'}</span>
          </div>
        </div>
        
        {/* Battery cells visualization */}
        <div className="tron-border rounded-lg p-3 bg-gray-900/50 backdrop-blur-sm">
          <div className="text-neon-cyan text-sm text-center mb-2">CELL STATUS</div>
          <div className="grid grid-cols-4 gap-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-sm ${
                  i < (batteryLevel / 100) * 8 
                    ? 'bg-green-400' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryIndicator;
