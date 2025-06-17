

import React, { useState, useEffect } from 'react';
import { Play, Square, Zap, Battery } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpeedGauge from './SpeedGauge';
import BatteryIndicator from './BatteryIndicator';

const BikeControls = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [power, setPower] = useState(0);
  const [gear, setGear] = useState(0); // Start with neutral gear

  // Simulate speed changes when bike is running
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSpeed(prev => {
          const newSpeed = Math.max(0, prev + (Math.random() - 0.5) * 10);
          return Math.min(100, newSpeed); // Changed max speed to 100
        });
        
        setPower(prev => {
          const newPower = Math.max(0, prev + (Math.random() - 0.5) * 20);
          return Math.min(100, newPower);
        });
        
        // Simulate battery consumption
        setBatteryLevel(prev => Math.max(0, prev - 0.01));
      }, 500);
    } else {
      setSpeed(0);
      setPower(0);
    }
    
    return () => clearInterval(interval);
  }, [isRunning]);

  // Auto gear shifting based on speed
  useEffect(() => {
    if (isRunning && speed > 5) { // Only shift out of neutral when moving
      if (speed < 15) setGear(1);
      else if (speed < 35) setGear(2);
      else if (speed < 60) setGear(3);
      else if (speed < 85) setGear(4);
      else setGear(5); // Added gear 5 for higher speeds
    } else if (!isRunning || speed <= 5) {
      setGear(0); // Neutral when stopped or very slow
    }
  }, [speed, isRunning]);

  const toggleBike = () => {
    setIsRunning(!isRunning);
    console.log(`Raider Sai ${!isRunning ? 'STARTED' : 'STOPPED'}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-tron-grid opacity-20" 
           style={{ backgroundSize: '50px 50px' }} />
      
      {/* Animated circuit pattern */}
      <div className="absolute inset-0 bg-circuit-pattern animate-circuit-flow opacity-10" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-5xl font-bold text-neon-blue tron-glow tracking-wider">
              RAIDER SAI
            </h1>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent mx-auto" />
          <p className="text-neon-cyan mt-4 text-lg tracking-wide">
            EV CONTROL SYSTEM
          </p>
        </div>

        {/* Main Control Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Speed Gauge */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <SpeedGauge speed={speed} isRunning={isRunning} gear={gear} />
          </div>

          {/* Central Control */}
          <div className="lg:col-span-1 order-1 lg:order-2 flex flex-col items-center justify-center">
            <div className="tron-border rounded-2xl p-8 bg-gray-900/50 backdrop-blur-sm mb-8">
              <Button
                onClick={toggleBike}
                className={`
                  w-32 h-32 rounded-full text-2xl font-bold tracking-wider
                  transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center
                  ${isRunning 
                    ? 'bg-red-600/20 border-2 border-red-400 text-red-400 hover:bg-red-600/30 animate-glow-pulse' 
                    : 'bg-neon-blue/20 border-2 border-neon-blue text-neon-blue hover:bg-neon-blue/30 tron-glow'
                  }
                `}
              >
                {isRunning ? (
                  <>
                    <Square className="w-6 h-6 mb-1" />
                    <span>STOP</span>
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6 mb-1" />
                    <span>START</span>
                  </>
                )}
              </Button>
            </div>

            {/* Status Display */}
            <div className="tron-border rounded-xl p-6 bg-gray-900/50 backdrop-blur-sm w-full max-w-sm">
              <div className="text-center">
                <div className="text-sm text-neon-cyan mb-2">STATUS</div>
                <div className={`text-2xl font-bold ${isRunning ? 'text-green-400' : 'text-red-400'}`}>
                  {isRunning ? 'ACTIVE' : 'STANDBY'}
                </div>
                <div className="mt-4 flex justify-center items-center space-x-4">
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 text-neon-orange mr-1" />
                    <span className="text-sm text-neon-orange">{power.toFixed(0)}%</span>
                  </div>
                  <div className="w-1 h-1 bg-neon-cyan rounded-full" />
                  <div className="text-sm text-neon-cyan">
                    {speed.toFixed(0)} KM/H
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Battery Indicator */}
          <div className="lg:col-span-1 order-3 lg:order-3">
            <BatteryIndicator batteryLevel={batteryLevel} isRunning={isRunning} />
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="tron-border rounded-lg p-4 bg-gray-900/30 text-center">
            <div className="text-neon-cyan text-sm">RANGE</div>
            <div className="text-white text-lg font-bold">90 KM</div>
          </div>
          <div className="tron-border rounded-lg p-4 bg-gray-900/30 text-center">
            <div className="text-neon-cyan text-sm">TEMP</div>
            <div className="text-white text-lg font-bold">{(25 + speed * 0.3).toFixed(0)}°C</div>
          </div>
          <div className="tron-border rounded-lg p-4 bg-gray-900/30 text-center">
            <div className="text-neon-cyan text-sm">MODE</div>
            <div className="text-white text-lg font-bold">ECO</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeControls;

