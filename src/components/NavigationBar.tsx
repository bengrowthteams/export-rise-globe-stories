
import React from 'react';
import { Globe } from 'lucide-react';

interface NavigationBarProps {
  onExploreClick?: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onExploreClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
              <Globe className="text-white" size={18} />
            </div>
            <h1 className="text-lg font-bold text-gray-900">Export Success Stories</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Why Exports?
            </button>
            <button 
              onClick={onExploreClick}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Explore
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              About
            </button>
            <button className="text-sm font-bold text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
