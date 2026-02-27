import React from 'react';
import { Map, BookOpen, Users, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 56, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Top divider accent */}
      <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-blue-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand column */}
          <div className="md:col-span-1">
            <button onClick={scrollToTop} className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
              <img
                src="/lovable-uploads/6660cc2f-78f5-40c9-9279-abe45f6d3098.png"
                alt="Growth Teams"
                className="h-8 w-auto brightness-0 invert opacity-90"
              />
              <span className="text-white font-semibold text-lg tracking-tight">Export Boom Atlas</span>
            </button>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Documenting 82 export booms in emerging economies since 1995—a living map of how transformation happens.
            </p>
            <a
              href="https://www.growth-teams.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-sm text-green-400 hover:text-green-300 transition-colors font-medium"
            >
              A project of Growth Teams
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-70">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Navigation column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Navigate</h4>
            <nav className="space-y-3">
              <button
                onClick={() => scrollTo('why-exports-section')}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <BookOpen size={14} className="text-green-500 group-hover:text-green-400 transition-colors" />
                Why Exports?
              </button>
              <button
                onClick={() => scrollTo('map-section')}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <Map size={14} className="text-green-500 group-hover:text-green-400 transition-colors" />
                Explore the Map
              </button>
              <button
                onClick={() => scrollTo('case-spotlights')}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-green-500 group-hover:text-green-400 transition-colors">
                  <path d="M7 1l1.545 3.13 3.455.502-2.5 2.435.59 3.44L7 8.885l-3.09 1.622.59-3.44L2 4.632l3.455-.502L7 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
                Case Spotlights
              </button>
              <button
                onClick={() => scrollTo('about-section')}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <Users size={14} className="text-green-500 group-hover:text-green-400 transition-colors" />
                About
              </button>
              <button
                onClick={() => scrollTo('methodology-section')}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <BookOpen size={14} className="text-green-500 group-hover:text-green-400 transition-colors" />
                Methodology
              </button>
            </nav>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Get Involved</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Have a missing export boom to share? Working to kickstart an export boom? Want to collaborate?
            </p>
            <button
              onClick={() => scrollTo('get-in-touch-section')}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Mail size={14} />
              Get In Touch
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex items-center justify-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Growth Teams. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
