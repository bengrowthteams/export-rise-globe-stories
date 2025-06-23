
import React from 'react';
import { TrendingUp, MapPin, DollarSign, Users } from 'lucide-react';
import { successStories } from '../data/successStories';

const StatsOverview: React.FC = () => {
  const totalCountries = successStories.length;
  const totalGrowth = successStories.reduce((sum, story) => sum + story.growthRate, 0);
  const avgGrowth = Math.round(totalGrowth / totalCountries);
  
  return (
    <div className="bg-white p-6 shadow-sm border-b">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
              <MapPin className="text-blue-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalCountries}</p>
            <p className="text-sm text-gray-600">Countries Featured</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{avgGrowth}%</p>
            <p className="text-sm text-gray-600">Average Growth</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
              <DollarSign className="text-purple-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-900">$192B+</p>
            <p className="text-sm text-gray-600">Combined Export Value</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-3">
              <Users className="text-orange-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-900">12M+</p>
            <p className="text-sm text-gray-600">Jobs Created</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
