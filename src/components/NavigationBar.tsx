
import React, { useState, useEffect } from 'react';

interface NavigationBarProps {
  onExploreClick?: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onExploreClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreClick = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const mapSection = document.getElementById('map-section');
      if (mapSection) {
        window.scrollTo({ top: mapSection.offsetTop - 56, behavior: 'smooth' });
      }
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 56, behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-950/95 backdrop-blur-md border-b border-white/8 shadow-xl shadow-black/20'
          : 'bg-gray-950/80 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo / Brand */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-3 hover:opacity-70 transition-opacity cursor-pointer"
          >
            <img
              src="/lovable-uploads/6660cc2f-78f5-40c9-9279-abe45f6d3098.png"
              alt="Growth Teams"
              className="h-8 sm:h-9 w-auto brightness-0 invert opacity-80"
            />
            <span className="hidden md:block text-base font-semibold text-gray-200 tracking-tight">
              Export Boom Atlas
            </span>
          </button>

          {/* Nav Links */}
          <div className="flex items-center space-x-0.5 sm:space-x-1">
            <button
              onClick={() => scrollTo('why-exports-section')}
              className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors font-medium px-2 sm:px-3 py-2 rounded-lg hover:bg-white/5"
            >
              <span className="hidden sm:inline">Why Exports?</span>
              <span className="sm:hidden">Why</span>
            </button>
            <button
              onClick={handleExploreClick}
              className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors font-medium px-2 sm:px-3 py-2 rounded-lg hover:bg-white/5"
            >
              Explore
            </button>
            <button
              onClick={() => scrollTo('about-section')}
              className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors font-medium px-2 sm:px-3 py-2 rounded-lg hover:bg-white/5"
            >
              About
            </button>
            <button
              onClick={() => scrollTo('get-in-touch-section')}
              className="text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 ml-2 border border-emerald-500/30"
            >
              <span className="hidden sm:inline">Get In Touch</span>
              <span className="sm:hidden">Contact</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
