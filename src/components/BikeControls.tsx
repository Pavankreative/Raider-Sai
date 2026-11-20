import React, { useEffect, useState } from 'react';
import { Play, Square, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpeedGauge from './SpeedGauge';
import BatteryIndicator from './BatteryIndicator';

const BikeControls = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [power, setPower] = useState(0);
  const [gear, setGear] = useState(0);

  // All values in this component are generated locally for the UI demonstration.
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setSpeed((previous) => {
          const next = Math.max(0, previous + (Math.random() - 0.5) * 10);
          return Math.min(100, next);
        });

        setPower((previous) => {
          const next = Math.max(0, previous + (Math.random() - 0.5) * 20);
          return Math.min(100, next);
        });

        setBatteryLevel((previous) => Math.max(0, previous - 0.01));
      }, 500);
    } else {
      setSpeed(0);
      setPower(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Four-speed display estimate only. It does not command or sense the physical gearbox.
  useEffect(() => {
    if (!isRunning || speed <= 5) {
      setGear(0);
    } else if (speed < 15) {
      setGear(1);
    } else if (speed < 35) {
      setGear(2);
    } else if (speed < 60) {
      setGear(3);
    } else {
      setGear(4);
    }
  }, [speed, isRunning]);

  const toggleDemo = () => setIsRunning((running) => !running);

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-tron-grid opacity-20"
        style={{ backgroundSize: '50px 50px' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-circuit-pattern animate-circuit-flow opacity-10" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-neon-blue tron-glow tracking-wider">
            RAIDER SAI
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent mx-auto mt-4" />
          <p className="text-neon-cyan mt-4 text-sm md:text-lg tracking-wide">
            EV SUPERVISORY INTERFACE — SIMULATION DEMO
          </p>
          <div className="mt-3 mx-auto max-w-2xl rounded-lg border border-amber-500/60 bg-amber-950/40 px-4 py-3 text-left">
            <p className="text-sm font-semibold text-amber-200">DEMO DATA — NO VEHICLE CONNECTION</p>
            <p className="mt-1 text-xs leading-relaxed text-amber-100/80">
              Speed, battery state, load and gear are simulated in this browser. No ESP32,
              BLE peripheral, sensor, motor controller or ignition relay is connected.
              The controls below do not operate a motorcycle.
            </p>
          </div>
        </header>

        <section aria-label="Simulated dashboard" className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <SpeedGauge speed={speed} isRunning={isRunning} gear={gear} />
          </div>

          <div className="lg:col-span-1 order-1 lg:order-2 flex flex-col items-center justify-center">
            <div className="tron-border rounded-2xl p-6 bg-gray-900/50 backdrop-blur-sm mb-6">
              <Button
                onClick={toggleDemo}
                aria-pressed={isRunning}
                className={
                  "w-24 h-24 md:w-32 md:h-32 rounded-full text-lg md:text-2xl font-bold tracking-wider " +
                  "transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center " +
                  (isRunning
                    ? "bg-red-600/20 border-2 border-red-400 text-red-400 hover:bg-red-600/30 animate-glow-pulse"
                    : "bg-neon-blue/20 border-2 border-neon-blue text-neon-blue hover:bg-neon-blue/30 tron-glow")
                }
              >
                {isRunning ? (
                  <>
                    <Square className="w-4 h-4 md:w-6 md:h-6 mb-1" />
                    <span className="text-xs md:text-base">STOP DEMO</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 md:w-6 md:h-6 mb-1" />
                    <span className="text-xs md:text-base">START DEMO</span>
                  </>
                )}
              </Button>
            </div>

            <div className="tron-border rounded-xl p-4 bg-gray-900/50 backdrop-blur-sm w-full max-w-sm">
              <div className="text-center">
                <div className="text-xs text-neon-cyan mb-2">DEMO STATUS</div>
                <div className={"text-lg md:text-2xl font-bold " + (isRunning ? "text-green-400" : "text-red-400")}>
                  {isRunning ? "RUNNING (SIMULATED)" : "STOPPED"}
                </div>
                <div className="mt-3 flex justify-center items-center space-x-3">
                  <div className="flex items-center">
                    <Zap className="w-3 h-3 text-neon-orange mr-1" />
                    <span className="text-xs text-neon-orange">Synthetic load: {power.toFixed(0)}%</span>
                  </div>
                  <div className="w-1 h-1 bg-neon-cyan rounded-full" />
                  <div className="text-xs text-neon-cyan">{speed.toFixed(0)} km/h demo</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 order-3 lg:order-3">
            <BatteryIndicator batteryLevel={batteryLevel} isRunning={isRunning} />
          </div>
        </section>

        <section aria-label="Project reference values and simulated display" className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="tron-border rounded-lg p-3 bg-gray-900/30 text-center">
            <div className="text-neon-cyan text-xs">RANGE CLAIM IN SOURCE REPORT</div>
            <div className="text-white text-sm md:text-lg font-bold">~90 km*</div>
            <p className="mt-1 text-[11px] text-gray-400">Calculation / historical report claim; not independently validated</p>
          </div>
          <div className="tron-border rounded-lg p-3 bg-gray-900/30 text-center">
            <div className="text-neon-cyan text-xs">SIMULATED TEMPERATURE</div>
            <div className="text-white text-sm md:text-lg font-bold">{(25 + speed * 0.3).toFixed(0)} °C</div>
            <p className="mt-1 text-[11px] text-gray-400">Synthetic display value; no temperature sensor</p>
          </div>
          <div className="tron-border rounded-lg p-3 bg-gray-900/30 text-center">
            <div className="text-neon-cyan text-xs">DEMO MODE</div>
            <div className="text-white text-sm md:text-lg font-bold">LOCAL UI ONLY</div>
            <p className="mt-1 text-[11px] text-gray-400">No firmware, BLE or vehicle control</p>
          </div>
        </section>

        <footer className="mt-8 text-center text-xs text-gray-500">
          RAIDER SAI project showcase · Values shown here are not live vehicle telemetry.
        </footer>
      </div>
    </main>
  );
};

export default BikeControls;
