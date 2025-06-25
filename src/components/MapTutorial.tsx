
import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
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
      content: "Country cards reveal export rankings, growth data, and the story behind each transformation. Click 'View Full Case Study' for comprehensive details about each success story.",
      position: "left",
      highlight: "card"
    }
  ];

  // Apply visual effects based on current step
  useEffect(() => {
    const applyHighlights = () => {
      // Remove all existing highlights first
      document.querySelectorAll('.custom-marker').forEach(marker => {
        const element = marker as HTMLElement;
        element.classList.remove('tutorial-highlight-marker');
        element.style.transform = '';
        element.style.boxShadow = '';
        element.style.animation = '';
      });

      const searchBar = document.querySelector('.tutorial-search-bar') as HTMLElement;
      if (searchBar) {
        searchBar.style.boxShadow = '';
        searchBar.style.border = '';
        searchBar.style.borderRadius = '';
        searchBar.style.background = '';
      }

      const storyCard = document.querySelector('.tutorial-story-card') as HTMLElement;
      if (storyCard) {
        storyCard.style.boxShadow = '';
        storyCard.style.border = '';
        storyCard.style.background = '';
        storyCard.style.transform = '';
      }

      // Apply highlights based on current step
      if (currentStep === 1) {
        // Highlight green dots - make them larger and add pulsing animation
        document.querySelectorAll('.custom-marker').forEach(marker => {
          const element = marker as HTMLElement;
          element.classList.add('tutorial-highlight-marker');
          element.style.transform = 'scale(1.5)';
          element.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.4)';
          element.style.animation = 'tutorial-pulse 2s infinite';
        });
      } else if (currentStep === 2) {
        // Highlight search bar
        if (searchBar) {
          searchBar.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.5), 0 8px 24px rgba(59, 130, 246, 0.4)';
          searchBar.style.border = '2px solid #3b82f6';
          searchBar.style.borderRadius = '12px';
          searchBar.style.background = 'rgba(59, 130, 246, 0.1)';
        }
      } else if (currentStep === 3 && demoStory) {
        // Highlight story card with bright effects
        if (storyCard) {
          storyCard.style.boxShadow = '0 0 0 6px rgba(147, 51, 234, 0.6), 0 20px 60px rgba(147, 51, 234, 0.5)';
          storyCard.style.border = '4px solid #9333ea';
          storyCard.style.background = 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(147, 51, 234, 0.2))';
          storyCard.style.transform = 'scale(1.02)';
        }
      }
    };

    applyHighlights();

    // Cleanup function
    return () => {
      document.querySelectorAll('.custom-marker').forEach(marker => {
        const element = marker as HTMLElement;
        element.classList.remove('tutorial-highlight-marker');
        element.style.transform = '';
        element.style.boxShadow = '';
        element.style.animation = '';
      });

      const searchBar = document.querySelector('.tutorial-search-bar') as HTMLElement;
      if (searchBar) {
        searchBar.style.boxShadow = '';
        searchBar.style.border = '';
        searchBar.style.borderRadius = '';
        searchBar.style.background = '';
      }

      const storyCard = document.querySelector('.tutorial-story-card') as HTMLElement;
      if (storyCard) {
        storyCard.style.boxShadow = '';
        storyCard.style.border = '';
        storyCard.style.background = '';
        storyCard.style.transform = '';
      }
    };
  }, [currentStep, demoStory]);

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

      {/* Tutorial card */}
      <div className={`absolute bg-white rounded-lg shadow-2xl p-6 max-w-md transition-all duration-500 z-40 ${
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

      {/* Add CSS for pulse animation */}
      <style>{`
        @keyframes tutorial-pulse {
          0%, 100% {
            transform: scale(1.5);
            opacity: 1;
          }
          50% {
            transform: scale(1.7);
            opacity: 0.8;
          }
        }
        .tutorial-highlight-marker {
          z-index: 1000 !important;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default MapTutorial;
