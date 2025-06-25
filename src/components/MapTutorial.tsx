
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SuccessStory } from '../types/SuccessStory';

interface MapTutorialProps {
  onClose: () => void;
  onDemoCountrySelect: (story: SuccessStory | null) => void;
  demoStory: SuccessStory | null;
}

const MapTutorial: React.FC<MapTutorialProps> = ({ onClose, onDemoCountrySelect, demoStory }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = [
    {
      title: "Welcome to the Transformation Atlas",
      content: "Discover how developing countries achieved remarkable export growth. Let's explore the interactive map together.",
      position: "center",
      highlight: null
    },
    {
      title: "Green Dots Mark Success Stories",
      content: "Each green dot represents a country with a documented transformation story. Click on any dot to explore their journey.",
      position: "left",
      highlight: "dots"
    },
    {
      title: "Search for Specific Countries",
      content: "Use the search bar to quickly find countries by name or explore by sector like textiles, electronics, or agriculture.",
      position: "bottom-right",
      highlight: "search"
    },
    {
      title: "Detailed Country Insights",
      content: "Country cards reveal export rankings, growth data, and the story behind each transformation. Click 'View Full Case Study' to read comprehensive details about each success story.",
      position: "left",
      highlight: "card"
    }
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      // Trigger demo for dots step - create a complete demo story
      const vietnamStory: SuccessStory = {
        id: 'demo-vietnam',
        country: 'Vietnam',
        flag: '🇻🇳',
        sector: 'Electronics & Textiles',
        product: 'Smartphones and Garments',
        description: 'Vietnam transformed from an agricultural economy to a global manufacturing hub through strategic foreign investment and export-oriented policies.',
        growthRate: 7000,
        timeframe: '1995-2022',
        exportValue: '$371.8 billion (2022)',
        keyFactors: [
          'Strategic FDI attraction',
          'Trade liberalization',
          'Skilled workforce development',
          'Infrastructure investment'
        ],
        coordinates: { lat: 14.0583, lng: 108.2772 },
        marketDestinations: ['United States', 'European Union', 'Japan', 'South Korea'],
        challenges: ['Rising labor costs', 'Environmental concerns', 'Competition from Bangladesh'],
        impact: {
          jobs: '2.5 million direct jobs',
          economicContribution: '15% of total export revenue'
        },
        globalRanking1995: 45,
        globalRanking2022: 12,
        initialExports1995: '$5,200,000,000',
        initialExports2022: '$371,800,000,000',
        successfulProduct: 'smartphones and textiles',
        successStorySummary: 'Vietnam transformed from an agricultural economy to a global manufacturing hub through strategic foreign investment and export-oriented policies, creating millions of jobs and driving remarkable export growth.'
      };
      onDemoCountrySelect(vietnamStory);
    } else if (currentStep === 3) {
      // Close demo story for final step
      onDemoCountrySelect(null);
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleSkip = () => {
    onDemoCountrySelect(null);
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Highlight overlays */}
      {currentStepData.highlight === 'dots' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Spotlight effect for map dots */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white bg-opacity-20 rounded-full animate-pulse" />
        </div>
      )}
      
      {currentStepData.highlight === 'search' && (
        <div className="absolute top-4 left-4 w-80 h-12 border-2 border-blue-400 rounded-lg animate-pulse" />
      )}

      {/* Tutorial card */}
      <div className={`absolute bg-white rounded-lg shadow-2xl p-6 max-w-md transition-all duration-500 ${
        currentStepData.position === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' :
        currentStepData.position === 'left' ? 'top-1/2 left-8 transform -translate-y-1/2' :
        currentStepData.position === 'bottom-right' ? 'bottom-8 right-8' :
        'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {currentStep + 1}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{currentStepData.title}</h3>
          </div>
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {currentStepData.content}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="text-gray-600"
            >
              Skip Tour
            </Button>
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentStep === steps.length - 1 ? 'Start Exploring' : 'Next'}
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapTutorial;
