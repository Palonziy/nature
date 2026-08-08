import React, { useState, useRef, MouseEvent } from 'react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  scale?: number;
  onClick?: () => void;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({
  children,
  className = '',
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  scale = 1.02,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  });
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transform: 'translate(-50%, -50%)',
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const percentX = (mouseX / width) * 2 - 1; // -1 to 1
    const percentY = (mouseY / height) * 2 - 1; // -1 to 1

    const rotateX = -percentY * tiltMaxAngleX;
    const rotateY = percentX * tiltMaxAngleY;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s ease-out',
    });

    setGlareStyle({
      opacity: 0.15,
      left: `${mouseX}px`,
      top: `${mouseY}px`,
      transition: 'opacity 0.2s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.6s ease-out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={style}
      className={`relative transform-gpu ${className}`}
    >
      {children}

      {/* Dynamic Specular Light Glare Overlay */}
      <div
        className="pointer-events-none absolute w-72 h-72 rounded-full bg-gradient-to-r from-white/40 to-transparent blur-2xl -translate-x-1/2 -translate-y-1/2 z-20"
        style={glareStyle}
      />
    </div>
  );
};
