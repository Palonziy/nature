import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onCtaClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCtaClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Studio', href: '#studio' },
    { label: 'About', href: '#about' },
    { label: 'Journal', href: '#journal' },
    { label: 'Reach Us', href: '#reach-us' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section scroll spy
      const sections = menuItems.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPos) {
          const matchedLabel = menuItems[i].label;
          setActiveItem(matchedLabel);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#FDFBF7]/85 backdrop-blur-md border-b border-emerald-900/10 shadow-xs'
          : 'py-6 bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <a
          href="#home"
          onClick={() => setActiveItem('Home')}
          className="text-3xl tracking-tight font-instrument select-none cursor-pointer flex items-baseline"
          style={{ color: '#1A2E20' }}
        >
          Aethera<sup className="text-xs ml-0.5 font-sans relative -top-3">®</sup>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {menuItems.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveItem(item.label)}
                className="text-sm font-sans transition-colors duration-200 hover:opacity-80 relative py-1"
                style={{
                  color: isActive ? '#1A2E20' : '#5A6E5D',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A27] rounded-full animate-fade-rise" />
                )}
              </a>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={onCtaClick}
            className="rounded-full px-6 py-2.5 text-sm font-sans transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-sm cursor-pointer bg-[#1E3A27] hover:bg-[#284E35] text-white"
          >
            Begin Journey
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1A2E20] hover:opacity-70 transition-opacity focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FDFBF7]/95 backdrop-blur-md border-b border-emerald-900/10 px-8 py-6 shadow-lg z-50 flex flex-col space-y-4 animate-fade-rise">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => {
                setActiveItem(item.label);
                setMobileMenuOpen(false);
              }}
              className="text-base font-sans py-2 transition-colors"
              style={{
                color: activeItem === item.label ? '#1A2E20' : '#5A6E5D',
                fontWeight: activeItem === item.label ? 600 : 400,
              }}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 border-t border-emerald-900/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onCtaClick?.();
              }}
              className="w-full rounded-full py-3 text-sm font-sans transition-transform active:scale-[0.98] bg-[#1E3A27] text-white"
            >
              Begin Journey
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
