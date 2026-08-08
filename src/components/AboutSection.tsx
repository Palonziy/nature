import React, { useState } from 'react';
import { Compass, ShieldCheck, Zap, Award, Users, Activity, ChevronDown, Sparkles } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard';
import { Nature3DCanvas } from './Nature3DCanvas';

export const AboutSection: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number>(0);

  const pillars = [
    {
      icon: Compass,
      title: 'Silent Architecture',
      subtitle: 'Eliminating digital noise to reveal core essence',
      content:
        'We believe every pixel should justify its existence. By stripping away intrusive notifications, dark patterns, and cognitive clutter, we build digital environments where users regain clarity and deep focus.',
    },
    {
      icon: Zap,
      title: 'Deep Flow Engineering',
      subtitle: 'Sub-100ms latency and fluid spatial transitions',
      content:
        'Performance is an aesthetic choice. Our web applications use WebGL acceleration, web workers, and predictive state hydration to ensure every interaction responds instantly at 60 FPS.',
    },
    {
      icon: ShieldCheck,
      title: 'Timeless Elegance',
      subtitle: 'Classical serif typography crafted for longevity',
      content:
        'Trends fade, but proportions and rhythm endure. We blend editorial typography with modern responsive grids to create digital experiences that remain timeless.',
    },
  ];

  const metrics = [
    { value: '99.9%', label: 'Purity Index', icon: ShieldCheck },
    { value: '40+', label: 'Global Awards', icon: Award },
    { value: '120k+', label: 'Daily Flow Users', icon: Users },
    { value: '<100ms', label: 'Average Latency', icon: Activity },
  ];

  return (
    <section id="about" className="relative z-10 py-32 px-6 bg-[#FDFBF7] text-[#1A2E20] overflow-hidden border-b border-emerald-900/10">
      {/* 3D Background Particles Field */}
      <Nature3DCanvas />

      {/* Background Visual Effects: Soft Green Orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-lime-100/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="reveal-element text-center max-w-4xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#5A6E5D] block mb-3">
            Philosophy & Craft
          </span>
          <h2 className="text-4xl sm:text-6xl font-instrument font-normal text-[#1A2E20] tracking-tight leading-tight mb-8">
            Beyond the noise, we craft sanctuaries where human attention endures.
          </h2>
          <p className="text-lg font-sans text-[#5A6E5D] leading-relaxed max-w-2xl mx-auto">
            In an era of hyper-stimulation, Aethera® engineers software as physical architecture — silent, enduring, and deeply respectful of user focus.
          </p>
        </div>

        {/* Pillars Accordion / Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          <div className="lg:col-span-5 reveal-element space-y-4">
            <h3 className="text-3xl font-instrument text-[#1A2E20] mb-6">
              Our Core Principles
            </h3>
            <p className="text-sm font-sans text-[#5A6E5D] leading-relaxed mb-8">
              Click through our foundational pillars to explore how we balance high technology with human-centered minimalism.
            </p>

            <div className="space-y-4">
              {pillars.map((pillar, idx) => {
                const isOpen = activeAccordion === idx;
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    onClick={() => setActiveAccordion(idx)}
                    className={`rounded-2xl p-6 transition-all duration-300 cursor-pointer border ${
                      isOpen
                        ? 'bg-white border-[#1E3A27] shadow-md scale-[1.01]'
                        : 'bg-white/80 border-emerald-900/10 hover:bg-white hover:border-emerald-800/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            isOpen ? 'bg-[#1E3A27] text-white' : 'bg-emerald-50 text-[#1A2E20]'
                          }`}
                        >
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <h4 className="text-lg font-instrument font-normal text-[#1A2E20]">
                            {pillar.title}
                          </h4>
                          <p className="text-xs font-sans text-[#5A6E5D]">
                            {pillar.subtitle}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-[#5A6E5D] transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#1E3A27]' : ''
                        }`}
                      />
                    </div>

                    {isOpen && (
                      <div className="mt-4 pt-4 border-t border-emerald-900/10 text-sm font-sans text-[#3A4E3D] leading-relaxed animate-fade-rise">
                        {pillar.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Philosophy Visual Showcase (3D Tilt Card) */}
          <ThreeDCard className="lg:col-span-7 reveal-element rounded-3xl overflow-hidden shadow-2xl bg-[#1D3A24] text-white p-10 sm:p-14 border border-emerald-800/30 min-h-[460px] flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A2E20] via-[#1E3A27] to-[#122317] opacity-95" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-emerald-200 font-sans font-semibold mb-6">
                <Sparkles size={14} className="text-amber-300" />
                <span>Manifesto Statement</span>
              </div>
              <blockquote className="text-3xl sm:text-4xl font-instrument leading-snug font-normal text-white mb-8">
                "Software should not demand your attention; it should magnify your human capability and return you to silence."
              </blockquote>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-6">
              <div>
                <p className="text-sm font-instrument text-white">Julian Vance</p>
                <p className="text-xs font-sans text-emerald-200/80">Founder & Chief Architect, Aethera®</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-sans text-emerald-300/60 uppercase tracking-widest">
                  Est. 2026
                </span>
              </div>
            </div>
          </ThreeDCard>
        </div>

        {/* Metrics Counter Bar */}
        <div className="reveal-element grid grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-3xl p-8 border border-emerald-900/10 shadow-sm">
          {metrics.map((metric) => {
            const IconComp = metric.icon;
            return (
              <div key={metric.label} className="text-center p-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#1E3A27] mx-auto mb-4 flex items-center justify-center">
                  <IconComp size={20} />
                </div>
                <div className="text-3xl sm:text-4xl font-instrument text-[#1A2E20] font-normal mb-1">
                  {metric.value}
                </div>
                <div className="text-xs font-sans text-[#5A6E5D] uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
