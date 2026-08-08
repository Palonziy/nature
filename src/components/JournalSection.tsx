import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard';
import { Nature3DCanvas } from './Nature3DCanvas';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string[];
  author: string;
}

const ARTICLES: Article[] = [
  {
    id: 'art-of-digital-silence',
    title: 'The Art of Digital Silence',
    excerpt: 'Why removing visual chatter creates deeper engagement, peace of mind, and longer user retention.',
    date: 'Aug 04, 2026',
    readTime: '5 min read',
    category: 'Design Philosophy',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80',
    author: 'Elena Rostova',
    content: [
      'In a digital landscape dominated by red notification badges, infinite scroll traps, and constant visual noise, silence has become the ultimate luxury.',
      'When we strip away secondary interface chrome, we allow the core content to breathe. Users no longer fight against the software; instead, the software recedes into the background.',
      'Designing for silence does not mean creating empty spaces—it means creating intentional spaces where thought can expand without interruption.',
    ],
  },
  {
    id: 'designing-hyper-focus',
    title: 'Designing for Hyper-focus in a Noisy World',
    excerpt: 'How low-latency feedback loops and spatial layouts sustain flow states during intense creative tasks.',
    date: 'Jul 28, 2026',
    readTime: '8 min read',
    category: 'UX Architecture',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    author: 'Julian Vance',
    content: [
      'Flow state is fragile. A single dropped frame or a 300ms network delay breaks the cognitive tether between thought and execution.',
      'By leveraging WebGL shaders, local web worker state management, and optimistic UI updates, we can build web interfaces that respond as fast as natural reflex.',
      'In this essay, we break down the three structural layers required to maintain uninterrupted human focus.',
    ],
  },
  {
    id: 'speed-as-aesthetic',
    title: 'Why Speed is an Aesthetic Choice',
    excerpt: 'Optimizing response times to sub-100ms transforms software from a tool into a seamless extension of thought.',
    date: 'Jul 14, 2026',
    readTime: '4 min read',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    author: 'Kaelen Thorne',
    content: [
      'We often think of aesthetics purely as visual harmony—colors, fonts, line height. But latency is a fundamental element of interface aesthetics.',
      'A beautiful interface that stutters during scrolling loses its grace immediately. Conversely, a minimalist layout that moves instantly feels like magic.',
      'We discuss our performance budget rules for zero-delay WebGL rendering.',
    ],
  },
];

interface JournalSectionProps {
  onSelectArticle: (article: Article) => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({ onSelectArticle }) => {
  return (
    <section id="journal" className="relative z-10 py-32 px-6 bg-[#FAF6F0] text-[#1A2E20] overflow-hidden">
      {/* 3D Background Field */}
      <Nature3DCanvas />

      {/* Visual Mesh Background */}
      <div className="absolute top-10 left-1/3 w-[600px] h-[350px] bg-emerald-100/40 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="reveal-element text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#5A6E5D] block mb-3">
            Insights & Journal
          </span>
          <h2 className="text-4xl sm:text-6xl font-instrument font-normal text-[#1A2E20] tracking-tight leading-none mb-6">
            Perspectives on Digital Craft
          </h2>
          <p className="text-base sm:text-lg font-sans text-[#5A6E5D] leading-relaxed">
            Essays, architectural studies, and reflections on building minimal interfaces that respect human focus.
          </p>
        </div>

        {/* Articles Grid with 3D Card Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <ThreeDCard
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="reveal-element group flex flex-col justify-between rounded-3xl bg-white border border-emerald-900/10 p-6 hover:shadow-2xl hover:border-[#1E3A27] transition-all duration-500 cursor-pointer"
            >
              <div>
                {/* Image Preview */}
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 bg-gray-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-wider text-[#1A2E20] font-medium">
                    {article.category}
                  </div>
                </div>

                {/* Meta information */}
                <div className="flex items-center space-x-4 text-xs font-sans text-[#5A6E5D] mb-3">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="text-2xl font-instrument text-[#1A2E20] font-normal mb-3 group-hover:underline decoration-1 underline-offset-4">
                  {article.title}
                </h3>

                <p className="text-sm font-sans text-[#5A6E5D] leading-relaxed line-clamp-3 mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-emerald-900/10 text-xs font-sans font-medium text-[#1A2E20]">
                <span>Read Essay</span>
                <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-[#1E3A27] group-hover:text-white transition-colors duration-300">
                  <ArrowRight size={14} />
                </div>
              </div>
            </ThreeDCard>
          ))}
        </div>
      </div>
    </section>
  );
};
