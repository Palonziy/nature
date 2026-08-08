import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2, Globe, Clock, MapPin, Radio, Mail, ExternalLink } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard';
import { Nature3DCanvas } from './Nature3DCanvas';

// Interactive 3D Revolving Studio Globe Component
const Studio3DGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 280);

    const radius = Math.min(width, height) * 0.35;
    const centerX = width / 2;
    const centerY = height / 2;

    // Generate Globe Dot Grid
    const dots: { lat: number; lon: number; isStudio?: boolean; name?: string }[] = [];
    
    // Add regular lat/lon grid points
    for (let lat = -80; lat <= 80; lat += 20) {
      for (let lon = 0; lon < 360; lon += 24) {
        dots.push({ lat, lon });
      }
    }

    // Add 4 Studio Nodes
    const studioNodes = [
      { name: 'Zürich', lat: 47.37, lon: 8.54 },
      { name: 'Tokyo', lat: 35.67, lon: 139.65 },
      { name: 'San Francisco', lat: 37.77, lon: -122.41 },
      { name: 'Tashkent', lat: 41.29, lon: 69.24 },
    ];

    studioNodes.forEach((s) => dots.push({ ...s, isStudio: true }));

    let rotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      rotation += 0.008;

      // Draw faint atmosphere circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Project & Render 3D Dots
      dots.forEach((dot) => {
        const phi = (90 - dot.lat) * (Math.PI / 180);
        const theta = (dot.lon + rotation * (180 / Math.PI)) * (Math.PI / 180);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        if (z > -radius * 0.2) {
          const scale = (z + radius) / (2 * radius);
          const projX = centerX + x;
          const projY = centerY + y;

          if (dot.isStudio) {
            const pulse = (Math.sin(Date.now() * 0.005) + 1) * 0.5;

            ctx.beginPath();
            ctx.arc(projX, projY, 8 + pulse * 6, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(251, 191, 36, ${0.8 - pulse * 0.4})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(projX, projY, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#FBBF24';
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#FBBF24';
            ctx.fill();

            ctx.font = '10px Inter, sans-serif';
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowBlur = 4;
            ctx.shadowColor = '#000000';
            ctx.fillText(dot.name || '', projX + 10, projY + 3);
          } else {
            ctx.beginPath();
            ctx.arc(projX, projY, 1.5 * scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${(scale * 0.4).toFixed(2)})`;
            ctx.shadowBlur = 0;
            ctx.fill();
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-56 rounded-2xl bg-black/40 border border-white/10 mb-6" />;
};

export const ReachUsSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Digital Haven');
  const [budget, setBudget] = useState('$50k - $100k');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [times, setTimes] = useState({
    zurich: '',
    tokyo: '',
    sanFrancisco: '',
    tashkent: '',
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const getFormattedTime = (timeZone: string) => {
        return new Intl.DateTimeFormat('en-US', {
          timeZone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(now);
      };

      setTimes({
        zurich: getFormattedTime('Europe/Zurich'),
        tokyo: getFormattedTime('Asia/Tokyo'),
        sanFrancisco: getFormattedTime('America/Los_Angeles'),
        tashkent: getFormattedTime('Asia/Tashkent'),
      });
    };

    updateClocks();
    const timer = setInterval(updateClocks, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const projectTypes = [
    'Digital Haven',
    'Spatial WebGL',
    'AI Agent Studio',
    'Brand Identity',
    'Custom Engineering',
  ];

  const budgetRanges = ['$25k - $50k', '$50k - $100k', '$100k+'];

  const studios = [
    { city: 'Zürich', region: 'Europe', tz: times.zurich, address: 'Gotthardstrasse 26, 8002', ping: '12ms' },
    { city: 'Tokyo', region: 'Asia', tz: times.tokyo, address: 'Minato City, Roppongi 6-10-1', ping: '18ms' },
    { city: 'San Francisco', region: 'North America', tz: times.sanFrancisco, address: '500 Howard St, Suite 400', ping: '14ms' },
    { city: 'Tashkent', region: 'Central Asia', tz: times.tashkent, address: 'Amir Temur Avenue 107', ping: '8ms' },
  ];

  return (
    <section id="reach-us" className="relative z-10 py-32 px-6 bg-[#F5F2EC] text-[#1A2E20] overflow-hidden border-t border-emerald-900/10">
      {/* 3D Background Canvas */}
      <Nature3DCanvas />

      {/* Background Visual: Ambient Green Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-lime-200/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="reveal-element text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#5A6E5D] block mb-3">
            Reach Us · Start a Conversation
          </span>
          <h2 className="text-4xl sm:text-6xl font-instrument font-normal text-[#1A2E20] tracking-tight leading-none mb-6">
            Let's build your eternal digital presence.
          </h2>
          <p className="text-base sm:text-lg font-sans text-[#5A6E5D] leading-relaxed mb-6">
            Have a project or strategic vision in mind? Direct inquiries to{' '}
            <a
              href="mailto:hello@palosite.com"
              className="text-[#1E3A27] font-semibold underline decoration-emerald-800/40 hover:decoration-[#1E3A27] transition-all inline-flex items-center space-x-1"
            >
              <span>hello@palosite.com</span>
              <Mail size={14} className="ml-1 inline" />
            </a>
          </p>

          {/* Partner Badge */}
          <div className="inline-flex items-center space-x-2 bg-emerald-100/60 border border-emerald-900/10 px-4 py-1.5 rounded-full text-xs font-sans text-[#1A2E20]">
            <span>Technology & Studio Partner:</span>
            <a
              href="https://palosite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#1E3A27] hover:underline flex items-center space-x-1"
            >
              <span>palosite.com</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 reveal-element bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-emerald-900/10 shadow-sm">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-6 animate-fade-rise">
                <div className="w-16 h-16 rounded-full bg-[#1E3A27] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-3xl font-instrument text-[#1A2E20]">Inquiry Received</h3>
                <p className="text-sm font-sans text-[#5A6E5D] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#1A2E20]">{name}</strong>. Our studio team at <strong className="text-[#1E3A27]">hello@palosite.com</strong> has received your project details and will respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="rounded-full px-8 py-3 bg-emerald-50 hover:bg-emerald-100 text-[#1E3A27] text-xs font-sans font-medium transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Inputs Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-sans font-semibold text-[#1A2E20] uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Julian Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-emerald-900/15 focus:border-[#1E3A27] focus:outline-none text-sm font-sans text-[#1A2E20] placeholder-[#5A6E5D]/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold text-[#1A2E20] uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. julian@palosite.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-emerald-900/15 focus:border-[#1E3A27] focus:outline-none text-sm font-sans text-[#1A2E20] placeholder-[#5A6E5D]/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Project Category Picker */}
                <div>
                  <label className="block text-xs font-sans font-semibold text-[#1A2E20] uppercase tracking-wider mb-3">
                    Project Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setProjectType(type)}
                        className={`px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${
                          projectType === type
                            ? 'bg-[#1E3A27] text-white font-medium shadow-xs'
                            : 'bg-emerald-50/60 text-[#5A6E5D] border border-emerald-900/10 hover:bg-emerald-100/60 hover:text-[#1A2E20]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range Picker */}
                <div>
                  <label className="block text-xs font-sans font-semibold text-[#1A2E20] uppercase tracking-wider mb-3">
                    Target Budget
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {budgetRanges.map((range) => (
                      <button
                        type="button"
                        key={range}
                        onClick={() => setBudget(range)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-sans text-center transition-all cursor-pointer ${
                          budget === range
                            ? 'bg-[#1E3A27] text-white font-medium shadow-xs'
                            : 'bg-emerald-50/60 text-[#5A6E5D] border border-emerald-900/10 hover:bg-emerald-100/60 hover:text-[#1A2E20]'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-sans font-semibold text-[#1A2E20] uppercase tracking-wider mb-2">
                    Project Details & Vision
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your brand goals, target timeline, or desired deliverables..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-emerald-900/15 focus:border-[#1E3A27] focus:outline-none text-sm font-sans text-[#1A2E20] placeholder-[#5A6E5D]/60 transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full py-4 px-8 bg-[#1E3A27] hover:bg-[#284E35] text-white text-sm font-sans font-medium hover:scale-[1.01] active:scale-[0.99] transition-transform duration-200 shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Encrypting & Transmitting...</span>
                  ) : (
                    <>
                      <span>Transmit Inquiry to hello@palosite.com</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Studios & 3D Radar Globe Column (ThreeDCard) */}
          <ThreeDCard className="lg:col-span-5 reveal-element rounded-3xl bg-[#1C3322] text-white p-8 sm:p-10 border border-emerald-800/30 shadow-2xl overflow-hidden backdrop-blur-md">
            {/* Radar Ping Animation Header */}
            <div className="flex items-center justify-between text-xs uppercase tracking-widest font-sans text-emerald-200/80 mb-6">
              <div className="flex items-center space-x-2">
                <Globe size={16} className="text-white" />
                <span>3D Global Network</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full text-[10px]">
                <Radio size={12} className="animate-pulse" />
                <span>Live Nodes</span>
              </div>
            </div>

            {/* Interactive 3D Revolving Radar Globe */}
            <Studio3DGlobe />

            <h3 className="text-3xl font-instrument text-white mb-6">Four Studios. One Philosophy.</h3>

            <div className="space-y-4">
              {studios.map((s) => (
                <div
                  key={s.city}
                  className="group p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} className="text-emerald-300 group-hover:text-amber-300 transition-colors" />
                      <h4 className="text-lg font-instrument font-normal text-white">{s.city}</h4>
                      <span className="text-[10px] text-emerald-200/60 uppercase font-sans">({s.region})</span>
                    </div>

                    <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
                      <Clock size={12} className="text-white/80" />
                      <span className="text-xs font-sans text-white font-mono">{s.tz || '--:--'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-sans text-emerald-100/70 pl-6">
                    <span>{s.address}</span>
                    <span className="text-[10px] text-emerald-300 font-mono">Ping: {s.ping}</span>
                  </div>
                </div>
              ))}
            </div>
          </ThreeDCard>
        </div>
      </div>
    </section>
  );
};
