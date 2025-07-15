
import React from 'react';
import { Globe } from 'lucide-react';

interface NavigationBarProps {
  onExploreClick?: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onExploreClick }) => {
  const handleExploreClick = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      // Fallback scroll logic if no onExploreClick prop
      const mapSection = document.getElementById('map-section');
      if (mapSection) {
        const navHeight = 56; // h-14 = 56px
        const elementPosition = mapSection.offsetTop;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleAboutClick = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      const navHeight = 56; // h-14 = 56px
      const elementPosition = aboutSection.offsetTop;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleWhyExportsClick = () => {
    // Scroll to a section explaining why exports matter (could be part of about or a separate section)
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      const navHeight = 56; // h-14 = 56px
      const elementPosition = aboutSection.offsetTop;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm border-b z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg shadow-sm">
              <Globe className="text-white" size={18} />
            </div>
            <h1 className="text-lg font-bold text-gray-900">Sector Transformation Atlas</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={handleWhyExportsClick}
              className="text-sm text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              Why Exports?
            </button>
            <button 
              onClick={handleExploreClick}
              className="text-sm text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              Explore
            </button>
            <button 
              onClick={handleAboutClick}
              className="text-sm text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              About
            </button>
            <button className="text-sm font-bold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
