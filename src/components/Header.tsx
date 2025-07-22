
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
              <h1 className="text-xl sm:text-xl font-bold text-gray-900">
                <span className="hidden sm:inline">Export Success Stories</span>
                <span className="sm:hidden">Export Stories</span>
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">Developing Countries Growth Map</p>
              <p className="text-xs text-gray-600 sm:hidden">Growth Map</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp size={16} className="hidden sm:block" />
            <span className="hidden md:inline">Interactive Global Data</span>
            <span className="md:hidden sm:inline text-xs">Global Data</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
