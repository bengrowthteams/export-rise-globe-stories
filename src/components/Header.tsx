
import React from 'react';
import { Globe, TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
              <Globe className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Export Success Stories</h1>
              <p className="text-sm text-gray-600">Developing Countries Growth Map</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp size={16} />
            <span>Interactive Global Data</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
