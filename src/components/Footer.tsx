import React, { useState } from 'react';
import { ArrowUp, ArrowRight, Check, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <footer className="relative z-10 bg-[#142318] text-white pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <a href="#" className="text-4xl font-instrument text-white inline-block">
              Aethera<sup className="text-xs ml-0.5 font-sans relative -top-4">®</sup>
            </a>
            <p className="text-sm font-sans text-emerald-100/70 max-w-sm leading-relaxed">
              Beyond silence, we build the eternal. Spatial web applications, audio reactive canvases, and intelligent flow engines.
            </p>

            <div className="pt-2 text-xs font-sans text-emerald-200/80 space-y-2">
              <p>
                Inquiries:{' '}
                <a href="mailto:hello@palosite.com" className="text-white hover:underline font-medium">
                  hello@palosite.com
                </a>
              </p>
              <p className="flex items-center space-x-1">
                <span>Studio Partner:</span>
                <a
                  href="https://palosite.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-white font-medium hover:underline inline-flex items-center space-x-1"
                >
                  <span>palosite.com</span>
                  <ExternalLink size={11} className="ml-0.5" />
                </a>
              </p>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 text-xs font-sans text-emerald-200/80 hover:text-white transition-colors pt-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                <ArrowUp size={14} />
              </div>
              <span>Back to Top</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-sans font-semibold text-emerald-300 mb-4">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm font-sans text-emerald-100/80">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#studio" className="hover:text-white transition-colors">Studio & Works</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">Philosophy & Metrics</a>
              </li>
              <li>
                <a href="#journal" className="hover:text-white transition-colors">Journal & Essays</a>
              </li>
              <li>
                <a href="#reach-us" className="hover:text-white transition-colors">Reach Us</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Input */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-sans font-semibold text-emerald-300 mb-4">
              The Aethera Dispatch
            </h4>
            <p className="text-xs font-sans text-emerald-100/70 leading-relaxed">
              Quarterly essays on digital architecture, spatial UI, and software aesthetics.
            </p>

            {subscribed ? (
              <div className="p-3 bg-white/10 rounded-xl text-xs font-sans text-white flex items-center space-x-2 animate-fade-rise">
                <Check size={16} className="text-emerald-400" />
                <span>Subscribed to dispatch. Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center space-x-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white/10 text-white placeholder-emerald-200/50 text-xs font-sans px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-white w-full transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white text-[#142318] hover:bg-emerald-50 px-4 py-3 rounded-xl text-xs font-sans font-medium transition-all flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-emerald-200/60 space-y-4 sm:space-y-0">
          <div>
            © 2026 Aethera® Inc. In Partnership with{' '}
            <a
              href="https://palosite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 hover:text-white font-medium hover:underline"
            >
              palosite.com
            </a>
            . All Rights Reserved.
          </div>

          <div className="flex space-x-6">
            <a href="https://palosite.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">palosite.com</a>
            <a href="#" className="hover:text-white transition-colors">Are.na</a>
            <a href="#" className="hover:text-white transition-colors">ReadCV</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
