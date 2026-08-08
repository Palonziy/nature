import React, { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard';
import { Nature3DCanvas } from './Nature3DCanvas';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Digital Havens' | 'Soundscapes' | 'AI Platforms' | 'Architecture';
  year: string;
  image: string;
  gradient: string;
  tags: string[];
  description: string;
  client: string;
  role: string;
}

const PROJECTS: Project[] = [
  {
    id: 'sanctuary-sound',
    title: 'Sanctuary of Sound',
    subtitle: 'Spatial Audio Flow Canvas',
    category: 'Soundscapes',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    gradient: 'from-emerald-900/30 via-teal-800/15 to-transparent',
    tags: ['WebGL', 'WebAudio API', 'Spatial UI'],
    description: 'An immersive spatial audio environment engineered for deep creative flow states and acoustic mindfulness.',
    client: 'Acoustic Labs International',
    role: 'Lead Experience Design & WebGL Architecture',
  },
  {
    id: 'chrono-flow',
    title: 'Chrono Flow',
    subtitle: 'Minimalist Focus & Time Engine',
    category: 'Digital Havens',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
    gradient: 'from-amber-900/30 via-stone-800/15 to-transparent',
    tags: ['React', 'TypeScript', 'Productivity'],
    description: 'Stripped of all notifications and metrics, Chrono Flow measures attention depth rather than elapsed minutes.',
    client: 'Mindful Technologies',
    role: 'Product Strategy & Frontend Development',
  },
  {
    id: 'aethera-core',
    title: 'Aethera Core AI',
    subtitle: 'Autonomous Creative Agent Studio',
    category: 'AI Platforms',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    gradient: 'from-green-900/30 via-emerald-800/15 to-transparent',
    tags: ['AI Agent SDK', 'Node.js', 'Canvas 2D'],
    description: 'Generative creative assistant that synthesizes visual themes, tone of voice, and interactive UI micro-components in real time.',
    client: 'Aethera Internal Research',
    role: 'AI System Architecture & UX Direction',
  },
  {
    id: 'monolith-spatial',
    title: 'Monolith Spatial',
    subtitle: '3D Architectural Flight Simulator',
    category: 'Architecture',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    gradient: 'from-stone-900/30 via-slate-800/15 to-transparent',
    tags: ['Three.js', 'Shader Glass', 'Architectural'],
    description: 'A 60 FPS continuous camera flight through physical and virtual architectural dioramas.',
    client: 'Studio Monolith Zürich',
    role: '3D WebGL Shader Development',
  },
  {
    id: 'verdant-horizons',
    title: 'Verdant Horizons',
    subtitle: 'Ecological Data Visualization',
    category: 'Digital Havens',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    gradient: 'from-teal-900/30 via-emerald-800/15 to-transparent',
    tags: ['Data Viz', 'D3.js', 'Ecology'],
    description: 'Translating real-time biosphere satellite metrics into dynamic generative botanical artwork.',
    client: 'Global Climate Initiative',
    role: 'Data Visualization & UI Styling',
  },
  {
    id: 'neural-symphony',
    title: 'Neural Symphony',
    subtitle: 'Generative Ambient Workspace',
    category: 'Soundscapes',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    gradient: 'from-lime-900/30 via-green-800/15 to-transparent',
    tags: ['WebAudio', 'Neural Nets', 'Generative'],
    description: 'Infinite generative ambient soundscapes tuned to circadian rhythms and focus sessions.',
    client: 'Symphony Audio Labs',
    role: 'Audio Processing & React Interface',
  },
];

interface StudioSectionProps {
  onSelectProject: (project: Project) => void;
}

export const StudioSection: React.FC<StudioSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Digital Havens', 'Soundscapes', 'AI Platforms', 'Architecture'];

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="studio" className="relative z-10 py-32 px-6 bg-[#F4F7F2] text-[#1A2E20] overflow-hidden border-y border-emerald-900/10">
      {/* 3D Interactive Background Field */}
      <Nature3DCanvas />

      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-lime-200/30 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="reveal-element mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#5A6E5D] block mb-3">
            Selected Works · 2026
          </span>
          <h2 className="text-4xl sm:text-6xl font-instrument font-normal text-[#1A2E20] tracking-tight leading-none mb-6">
            Crafted Works & Digital Havens
          </h2>
          <p className="text-base sm:text-lg font-sans text-[#5A6E5D] leading-relaxed">
            A curated collection of spatial web applications, audio reactive canvases, and intelligent flow engines built for mindful interactions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="reveal-element flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#1E3A27] text-white shadow-md scale-105 font-medium'
                    : 'bg-white/80 text-[#5A6E5D] hover:bg-white hover:text-[#1A2E20] border border-emerald-900/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ThreeDCard
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="reveal-element group rounded-3xl bg-white/95 border border-emerald-900/10 overflow-hidden shadow-sm hover:shadow-2xl hover:border-emerald-800/30 transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              {/* Card Media Header */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-60`} />

                {/* Category Pill Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-sans font-medium uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#1A2E20] shadow-xs">
                    {project.category}
                  </span>
                </div>

                {/* Play Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#1E3A27] text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                    <Play size={20} className="ml-0.5" />
                  </div>
                </div>

                {/* Year Badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-sans text-[#1A2E20] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-900/10 font-mono">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-instrument text-[#1A2E20] font-normal group-hover:text-[#1E3A27] transition-colors">
                      {project.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-[#1A2E20] group-hover:bg-[#1E3A27] group-hover:text-white transition-colors duration-300">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  <p className="text-xs font-sans font-medium text-[#5A6E5D] mb-4">
                    {project.subtitle}
                  </p>

                  <p className="text-sm font-sans text-[#5A6E5D] line-clamp-2 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-emerald-900/10">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-sans text-[#5A6E5D] bg-emerald-50/50 border border-emerald-900/10 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ThreeDCard>
          ))}
        </div>
      </div>
    </section>
  );
};
