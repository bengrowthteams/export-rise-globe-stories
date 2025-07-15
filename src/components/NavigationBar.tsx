
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

  const handleWhyExportsClick = () => {
    // Scroll to the Why Exports section
    const whyExportsSection = document.querySelector('.bg-gradient-to-b.from-white.to-gray-50');
    if (whyExportsSection) {
      const navHeight = 56; // h-14 = 56px
      const elementPosition = whyExportsSection.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      const navHeight = 56; // h-14 = 56px
      const elementPosition = contactSection.offsetTop;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
              <Globe className="text-white" size={18} />
            </div>
            <h1 className="text-lg font-bold text-gray-900">Sector Transformation Atlas</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={handleWhyExportsClick}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Why Exports?
            </button>
            <button 
              onClick={handleExploreClick}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Explore
            </button>
            <button 
              onClick={handleAboutClick}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </button>
            <button 
              onClick={handleContactClick}
              className="text-sm font-bold text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
