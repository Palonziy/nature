import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VideoBackground } from './components/VideoBackground';
import { StudioSection, Project } from './components/StudioSection';
import { AboutSection } from './components/AboutSection';
import { JournalSection, Article } from './components/JournalSection';
import { ReachUsSection } from './components/ReachUsSection';
import { Footer } from './components/Footer';
import { SecurityWrapper } from './components/SecurityWrapper';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Sparkles, ArrowRight, X, Calendar, Clock } from 'lucide-react';

export const App: React.FC = () => {
  useScrollReveal();

  const [journeyModalOpen, setJourneyModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleBeginJourney = () => {
    setJourneyModalOpen(true);
  };

  return (
    <SecurityWrapper>
      <div className="relative min-h-screen w-full bg-[#FDFBF7] text-[#1A2E20] selection:bg-[#1E3A27] selection:text-white flex flex-col justify-between overflow-x-hidden">
        {/* Navigation Bar (Sticky Glassmorphic) */}
        <Navbar onCtaClick={handleBeginJourney} />

        {/* Main Content Flow */}
        <div className="relative z-10 flex flex-col">
          {/* Section 1: Hero */}
          <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-[#FDFBF7]">
            {/* Background Video Layer (Hero section area ONLY) */}
            <VideoBackground />
            <Hero onCtaClick={handleBeginJourney} />
          </section>

          {/* Section 2: Studio / Portfolio Grid */}
          <StudioSection onSelectProject={(project) => setSelectedProject(project)} />

          {/* Section 3: Philosophy & Metrics */}
          <AboutSection />

          {/* Section 4: Journal & Perspectives */}
          <JournalSection onSelectArticle={(article) => setSelectedArticle(article)} />

          {/* Section 5: Reach Us / Contact */}
          <ReachUsSection />
        </div>

        {/* Footer */}
        <Footer />

        {/* Modal 1: Begin Journey Dialog */}
        {journeyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-md animate-fade-rise">
            <div className="bg-[#FDFBF7] rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-emerald-900/10 flex flex-col items-center text-center">
              <button
                onClick={() => setJourneyModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-emerald-50 transition-colors text-[#5A6E5D] hover:text-[#1A2E20] cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="w-14 h-14 rounded-full bg-[#1E3A27] text-white flex items-center justify-center mb-6 shadow-md">
                <Sparkles size={24} />
              </div>

              <h3 className="text-3xl font-instrument mb-3 text-[#1A2E20]">
                Welcome to Aethera<sup className="text-xs">®</sup>
              </h3>
              <p className="text-sm font-sans text-[#5A6E5D] leading-relaxed mb-8">
                Your journey into digital craftsmanship, spatial web architecture, and silent UI design begins now.
              </p>

              <a
                href="#reach-us"
                onClick={() => setJourneyModalOpen(false)}
                className="w-full rounded-full py-3.5 px-6 text-sm font-sans font-medium bg-[#1E3A27] hover:bg-[#284E35] text-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
              >
                <span>Initiate Project Inquiry</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        )}

        {/* Modal 2: Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-emerald-950/50 backdrop-blur-md animate-fade-rise overflow-y-auto">
            <div className="bg-[#FDFBF7] rounded-3xl max-w-2xl w-full shadow-2xl relative border border-emerald-900/10 overflow-hidden my-8">
              {/* Modal Image Header */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover opacity-90"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 text-white hover:bg-black transition-colors backdrop-blur-md cursor-pointer"
                >
                  <X size={20} />
                </button>

                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1 rounded-full text-xs font-sans font-medium uppercase tracking-wider bg-[#FDFBF7] text-[#1A2E20]">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Modal Details Body */}
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-3xl font-instrument text-[#1A2E20] mb-1">{selectedProject.title}</h3>
                  <p className="text-sm font-sans text-[#5A6E5D] font-medium">{selectedProject.subtitle}</p>
                </div>

                <p className="text-base font-sans text-[#3A4E3D] leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-emerald-900/10 text-xs font-sans">
                  <div>
                    <span className="text-[#5A6E5D] uppercase tracking-wider block mb-1">Client</span>
                    <span className="text-[#1A2E20] font-semibold">{selectedProject.client}</span>
                  </div>
                  <div>
                    <span className="text-[#5A6E5D] uppercase tracking-wider block mb-1">Role</span>
                    <span className="text-[#1A2E20] font-semibold">{selectedProject.role}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="text-xs font-sans bg-emerald-50 text-[#1A2E20] px-3 py-1 rounded-full border border-emerald-900/10">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full px-6 py-2.5 bg-[#1E3A27] text-white text-xs font-sans hover:scale-105 transition-transform cursor-pointer flex items-center space-x-1"
                  >
                    <span>Close Project</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal 3: Article Reader Drawer */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex justify-end bg-emerald-950/40 backdrop-blur-sm animate-fade-rise">
            <div className="bg-[#FDFBF7] w-full max-w-2xl h-full shadow-2xl p-8 sm:p-12 overflow-y-auto relative flex flex-col justify-between border-l border-emerald-900/10">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-emerald-50 text-[#1A2E20] hover:bg-[#1E3A27] hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div>
                <div className="flex items-center space-x-3 text-xs font-sans text-[#5A6E5D] mb-6">
                  <span className="uppercase tracking-wider font-semibold text-[#1A2E20]">{selectedArticle.category}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>{selectedArticle.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{selectedArticle.readTime}</span>
                  </span>
                </div>

                <h2 className="text-4xl font-instrument text-[#1A2E20] mb-6 leading-snug">{selectedArticle.title}</h2>

                <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-emerald-900/10">
                  <div className="w-10 h-10 rounded-full bg-[#1E3A27] text-white flex items-center justify-center font-instrument text-sm">
                    {selectedArticle.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-sans font-semibold text-[#1A2E20]">{selectedArticle.author}</p>
                    <p className="text-[11px] font-sans text-[#5A6E5D]">Senior Architectural Fellow</p>
                  </div>
                </div>

                <div className="space-y-6 font-sans text-base text-[#3A4E3D] leading-relaxed">
                  {selectedArticle.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="pt-10 border-t border-emerald-900/10 mt-12 flex items-center justify-between">
                <span className="text-xs font-sans text-[#5A6E5D]">Published by Aethera® Journal</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="rounded-full px-6 py-2.5 bg-[#1E3A27] text-white text-xs font-sans cursor-pointer hover:bg-[#284E35]"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SecurityWrapper>
  );
};

export default App;
