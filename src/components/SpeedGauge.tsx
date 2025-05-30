
import React from 'react';

interface SpeedGaugeProps {
  speed: number;
  isRunning: boolean;
  gear: number;
}

const SpeedGauge = ({ speed, isRunning, gear }: SpeedGaugeProps) => {
  const maxSpeed = 90;
  const angle = (speed / maxSpeed) * 180 - 90;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full tron-border bg-gray-900/50 backdrop-blur-sm">
          {/* Speed arc background */}
          <svg className="absolute inset-4 w-56 h-56" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="50%" stopColor="#00ffff" />
                <stop offset="100%" stopColor="#ff8c00" />
              </linearGradient>
            </defs>
            
            {/* Background arc */}
            <path
              d="M 30 100 A 70 70 0 0 1 170 100"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="8"
              strokeLinecap="round"
            />
            
            {/* Speed arc */}
            <path
              d="M 30 100 A 70 70 0 0 1 170 100"
              fill="none"
              stroke="url(#speedGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(speed / maxSpeed) * 220} 220`}
              className={`transition-all duration-500 ${isRunning ? 'opacity-100' : 'opacity-50'}`}
            />
            
            {/* Speed markings */}
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((mark, index) => {
              const markAngle = (mark / maxSpeed) * 180 - 90;
              const x1 = 100 + 60 * Math.cos((markAngle * Math.PI) / 180);
              const y1 = 100 + 60 * Math.sin((markAngle * Math.PI) / 180);
              const x2 = 100 + 70 * Math.cos((markAngle * Math.PI) / 180);
              const y2 = 100 + 70 * Math.sin((markAngle * Math.PI) / 180);
              
              return (
                <g key={mark}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#00d4ff"
                    strokeWidth="2"
                    className="drop-shadow-[0_0_8px_#00d4ff]"
                  />
                  <text
                    x={100 + 80 * Math.cos((markAngle * Math.PI) / 180)}
                    y={100 + 80 * Math.sin((markAngle * Math.PI) / 180)}
                    fill="#00d4ff"
                    fontSize="10"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="drop-shadow-[0_0_6px_#00d4ff]"
                  >
                    {mark}
                  </text>
                </g>
              );
            })}
            
            {/* Needle */}
            <line
              x1="100"
              y1="100"
              x2={100 + 50 * Math.cos((angle * Math.PI) / 180)}
              y2={100 + 50 * Math.sin((angle * Math.PI) / 180)}
              stroke="#ff8c00"
              strokeWidth="3"
              strokeLinecap="round"
              className={`transition-all duration-500 ${isRunning ? 'drop-shadow-[0_0_15px_#ff8c00]' : ''}`}
            />
            
            {/* Center dot */}
            <circle
              cx="100"
              cy="100"
              r="6"
              fill="#ff8c00"
              className={isRunning ? 'drop-shadow-[0_0_15px_#ff8c00]' : ''}
            />
          </svg>
          
          {/* Center display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-neon-orange mb-2 drop-shadow-[0_0_10px_#ff8c00]">
              {speed.toFixed(0)}
            </div>
            <div className="text-sm text-neon-cyan drop-shadow-[0_0_6px_#00ffff]">KM/H</div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-2 w-full max-w-xs">
        <div className="tron-border rounded-lg p-3 bg-gray-900/50 backdrop-blur-sm">
          <div className="text-neon-cyan text-sm text-center drop-shadow-[0_0_6px_#00ffff]">SPEED MONITOR</div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>0</span>
            <span>MAX: 90 KM/H</span>
          </div>
        </div>
        
        {/* Gear Indicator */}
        <div className="tron-border rounded-lg p-3 bg-gray-900/50 backdrop-blur-sm">
          <div className="text-neon-cyan text-sm text-center mb-2 drop-shadow-[0_0_6px_#00ffff]">GEAR</div>
          <div className="flex justify-center items-center">
            <div className="text-3xl font-bold text-neon-orange drop-shadow-[0_0_10px_#ff8c00]">
              {gear === 0 ? 'N' : gear}
            </div>
          </div>
          <div className="flex justify-center mt-2 space-x-1">
            {/* Neutral indicator */}
            <div className={`w-3 h-3 rounded-full ${gear === 0 ? 'bg-neon-orange drop-shadow-[0_0_6px_#ff8c00]' : 'bg-gray-600'}`} />
            {[1, 2, 3, 4].map((g) => (
              <div
                key={g}
                className={`w-3 h-3 rounded-full ${
                  g <= gear && gear > 0 ? 'bg-neon-orange drop-shadow-[0_0_6px_#ff8c00]' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedGauge;
