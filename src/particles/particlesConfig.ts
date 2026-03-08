// tsParticles configuration for interactive background
export const particlesConfig = {
  background: {
    color: { value: '#0B0F19' },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'repulse' },
      resize: true,
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
    },
  },
  particles: {
    color: { value: ['#00FFF0', '#A259FF'] },
    links: { enable: true, color: '#A259FF', distance: 150, opacity: 0.3, width: 1 },
    collisions: { enable: false },
    move: {
      direction: 'none',
      enable: true,
      outModes: 'bounce',
      random: false,
      speed: 1.2,
      straight: false,
    },
    number: { density: { enable: true, area: 800 }, value: 60 },
    opacity: { value: 0.5 },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 4 } },
  },
  detectRetina: true,
};
