
import React from 'react';
import { Globe } from 'lucide-react';

const NavigationBar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
              <Globe className="text-white" size={18} />
            </div>
            <h1 className="text-lg font-bold text-gray-900">Export Success Stories</h1>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              About Growth Teams
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Methodology/Instructions
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
