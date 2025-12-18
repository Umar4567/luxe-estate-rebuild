import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

/*
VisPlusePage

- Interactive demo inspired by VesPlus animations.
- Controls: Play/Pause, Speed (0.2x - 3x), Density (2 - 40 orbs)
- Smooth pulsing / orbital animation with a centered SVG heartbeat overlay

Notes:
- Requires `framer-motion` and TailwindCSS. Install with:
  npm install framer-motion
- Save this file as `src/VisPlusePage.jsx` and run `npm run dev`.
*/

const Orb = ({ index, total, radius, size, speed, playing }) => {
  const angle = (index / total) * Math.PI * 2;
  // Each orb will orbit and pulse. We'll use CSS animation via inline style for simplicity.
  const orbitDuration = Math.max(6 / speed, 0.5);
  const delay = (index / total) * (orbitDuration / 2);
  const left = `calc(50% + ${Math.cos(angle) * radius}px)`;
  const top = `calc(50% + ${Math.sin(angle) * radius}px)`;

  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 shadow-2xl"
      style={{ width: size, height: size, left, top, transform: 'translate(-50%, -50%)' }}
      animate={
        playing
          ? {
              scale: [1, 1.4, 1],
              // tiny orbital offset to give life
              x: [0, Math.cos(angle) * 6, 0],
              y: [0, Math.sin(angle) * 6, 0],
            }
          : { scale: 1, x: 0, y: 0 }
      }
      transition={{ duration: orbitDuration, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0, delay }}
    />
  );
};

const HeartbeatSVG = ({ color = '#ffffff', stroke = 3, speed = 1, playing = true }) => {
  // Simple heartbeat path animation using strokeDashoffset
  const duration = Math.max(1.5 / speed, 0.25);
  return (
    <svg viewBox="0 0 200 60" className="w-full max-w-md mx-auto block pointer-events-none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffd166" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path
        d="M2 30 L30 30 L40 15 L50 45 L65 30 L90 30 L110 20 L130 40 L150 30 L198 30"
        fill="none"
        stroke="url(#g)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 300,
          strokeDashoffset: playing ? 0 : 300,
          transition: `stroke-dashoffset ${duration}s linear`,
        }}
      />
    </svg>
  );
};

export default function VisPlusePage() {
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [density, setDensity] = useState(12);
  const [radius, setRadius] = useState(160);

  // clamp values
  const clampedDensity = Math.max(2, Math.min(40, density));
  const clampedSpeed = Math.max(0.2, Math.min(3, speed));

  const orbs = useMemo(() => Array.from({ length: clampedDensity }).map((_, i) => i), [clampedDensity]);

  useEffect(() => {
    // small accessibility: pause animations if prefers-reduced-motion
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) setPlaying(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-800 text-white p-6">
      <header className="w-full max-w-6xl flex items-center justify-between py-6">
        <h1 className="text-2xl font-semibold tracking-tight">VisPluse — Animation Preview</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            {playing ? 'Pause' : 'Play'}
          </button>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-sm opacity-80">
            Docs
          </a>
        </div>
      </header>

      <main className="w-full max-w-6xl flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <section className="md:col-span-2 relative bg-black/30 rounded-2xl p-6 overflow-hidden h-[640px]">
          {/* orbital area */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {orbs.map((i) => (
                <Orb key={i} index={i} total={orbs.length} radius={radius} size={`${24 + (i % 6)}px`} speed={clampedSpeed} playing={playing} />
              ))}

              {/* center glow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 to-blue-400 opacity-70 blur-3xl" />
            </div>
          </div>

          {/* heartbeat overlay */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full pointer-events-none">
            <HeartbeatSVG playing={playing} speed={clampedSpeed} />
          </div>
        </section>

        <aside className="bg-white/6 rounded-2xl p-5 backdrop-blur-sm border border-white/6">
          <h2 className="text-lg font-medium mb-4">Controls</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-200 mb-2">Speed: {clampedSpeed.toFixed(2)}x</label>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.05"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-200 mb-2">Density: {clampedDensity}</label>
              <input
                type="range"
                min="2"
                max="40"
                step="1"
                value={density}
                onChange={(e) => setDensity(parseInt(e.target.value, 10))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-200 mb-2">Radius: {radius}px</label>
              <input
                type="range"
                min="60"
                max="300"
                step="5"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value, 10))}
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => { setPlaying(true); }}
                className="flex-1 px-3 py-2 rounded bg-emerald-500 hover:bg-emerald-600"
              >
                Play
              </button>
              <button
                onClick={() => { setPlaying(false); }}
                className="flex-1 px-3 py-2 rounded bg-rose-500 hover:bg-rose-600"
              >
                Pause
              </button>
            </div>

            <div className="text-xs text-gray-300">
              Tip: Use the sliders to tweak the animation. This demo is designed for use as a hero/visual background.
            </div>
          </div>
        </aside>
      </main>

      <footer className="w-full max-w-6xl py-6 text-center text-sm opacity-80">
        <span>VisPluse demo · Tailwind + Framer Motion</span>
      </footer>
    </div>
  );
}
