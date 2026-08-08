import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
}

export const Nature3DCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for 3D parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - width / 2) * 0.1;
      targetMouseY = (e.clientY - rect.top - height / 2) * 0.1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize 3D particles
    const particleCount = 45;
    const particles: Particle[] = [];
    const colors = ['rgba(45, 90, 39, ', 'rgba(90, 110, 93, ', 'rgba(180, 160, 120, '];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: Math.random() * 800 - 400,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.2, // slight upward drift like pollen
        vz: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const focalLength = 400;

    const render = () => {
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + mouseX;
      const centerY = height / 2 + mouseY;

      // Update & Render Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap boundaries in 3D
        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height;
        if (p.y > height) p.y = -height;
        if (p.z < -400) p.z = 400;
        if (p.z > 400) p.z = -400;

        // 3D perspective projection
        const scale = focalLength / (focalLength + p.z + 500);
        if (scale <= 0) continue;

        const projX = centerX + p.x * scale;
        const projY = centerY + p.y * scale;
        const projRadius = p.radius * scale;
        const alpha = Math.min(1, Math.max(0.1, (scale - 0.3) * 1.5));

        // Draw Particle
        ctx.beginPath();
        ctx.arc(projX, projY, Math.max(0.5, projRadius), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha.toFixed(2)})`;
        ctx.shadowBlur = 10 * scale;
        ctx.shadowColor = `${p.color}0.4)`;
        ctx.fill();

        // Connect nearby particles in 3D
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dz = p.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 180) {
            const scale2 = focalLength / (focalLength + p2.z + 500);
            const projX2 = centerX + p2.x * scale2;
            const projY2 = centerY + p2.y * scale2;
            const lineAlpha = (1 - dist / 180) * 0.15 * alpha;

            ctx.beginPath();
            ctx.moveTo(projX, projY);
            ctx.lineTo(projX2, projY2);
            ctx.strokeStyle = `rgba(30, 58, 39, ${lineAlpha.toFixed(2)})`;
            ctx.lineWidth = 0.8 * scale;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none z-0 ${className}`} />;
};
