import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onCtaClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 pb-28 max-w-4xl mx-auto w-full">
      {/* Compact Editorial Glass Backplate Container (Lower Opacity: 35%) */}
      <div className="w-full bg-[#FDFBF7]/35 backdrop-blur-md rounded-[2rem] border border-emerald-900/15 shadow-xl p-6 sm:p-10 md:p-12 flex flex-col items-center text-center animate-fade-rise relative overflow-hidden transition-all duration-500 hover:bg-[#FDFBF7]/45">
        {/* Subtle Inner Ambient Light Leaks */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Eyebrow Badge */}
        <div className="inline-flex items-center space-x-2 bg-emerald-900/15 border border-emerald-900/20 px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-sans font-medium text-[#1E3A27] mb-6 select-none shadow-2xs">
          <Sparkles size={12} className="text-amber-700 shrink-0" />
          <span className="uppercase tracking-[0.18em]">Eco-Technological Intelligence & Spatial Craft</span>
        </div>

        {/* Headline with Crisp Text Shadow */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl font-normal font-instrument leading-[1.05] tracking-[-0.02em] select-none text-[#122317] drop-shadow-xs">
          Beyond{' '}
          <span className="italic font-normal text-[#2C4A32]">
            silence,
          </span>{' '}
          we build{' '}
          <span className="italic font-normal text-[#2C4A32]">
            the eternal.
          </span>
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg max-w-xl mt-6 leading-relaxed font-sans text-[#233B27] font-medium drop-shadow-2xs">
          Building platforms for brilliant minds, fearless makers, and thoughtful souls.
          Through the noise, we craft digital havens for deep work and pure flows.
        </p>

        {/* Hero CTA Button */}
        <div className="mt-8 animate-fade-rise-delay-2">
          <button
            onClick={onCtaClick}
            className="rounded-full px-8 py-3.5 text-sm sm:text-base font-sans font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-md hover:shadow-xl cursor-pointer bg-[#1E3A27] hover:bg-[#284E35] text-white flex items-center space-x-3 group"
          >
            <span>Begin Journey</span>
            <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight size={14} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
