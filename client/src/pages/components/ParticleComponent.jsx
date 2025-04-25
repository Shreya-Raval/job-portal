import { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesComponent = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
            background: {
            color: {
                value: "gray-900",
            },
            },
            fpsLimit: 120,
            particles: {
            color: {
                value: "#ffffff",
            },
            links: {
                color: "#3b82f8",
                distance: 150,
                enable: true,
                opacity: 0.8,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
            },
            number: {
                density: {
                enable: true,
                area: 800,
                },
                value: 50,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
            },
            detectRetina: true,
        }}
        className="absolute inset-0 z-0"
    />
  );
};

export default ParticlesComponent;