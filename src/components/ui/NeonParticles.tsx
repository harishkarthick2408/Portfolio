'use client';
import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';

export default function NeonParticles() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // loadFull from tsparticles v3 includes repulse interaction and links
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await loadFull(engine as any);
    }).then(() => setEngineReady(true));
  }, []);

  if (!engineReady) return null;

  return (
    <Particles
      id="hero-particles"
      options={{
        background: { color: 'transparent' },
        fpsLimit: 60,
        interactivity: {
          detectsOn: 'window',
          events: {
            onHover: { enable: true, mode: 'repulse' },
            resize: { enable: true },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
              speed: 0.5,
            },
          },
        },
        particles: {
          color: {
            value: ['#7dd3fc', '#a78bfa', '#34d399'],
          },
          links: {
            enable: true,
            color: '#7dd3fc',
            distance: 160,
            opacity: 0.45,
            width: 1.5,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: { default: 'bounce' },
            random: true,
            speed: { min: 0.6, max: 1.4 },
            straight: false,
          },
          number: {
            density: { enable: true },
            value: 100,
          },
          opacity: {
            value: { min: 0.5, max: 0.9 },
          },
          shape: { type: 'circle' },
          size: {
            value: { min: 2, max: 5 },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
