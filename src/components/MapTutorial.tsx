
import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SuccessStory } from '../types/SuccessStory';
import { fetchSuccessStories } from '../services/countryDataService';

interface MapTutorialProps {
  onClose: () => void;
  onDemoCountrySelect: (story: SuccessStory | null) => void;
  demoStory: SuccessStory | null;
}

const MapTutorial: React.FC<MapTutorialProps> = ({ onClose, onDemoCountrySelect, demoStory }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [demoStoryData, setDemoStoryData] = useState<SuccessStory | null>(null);

  const steps = [
    {
      title: "Welcome to the Transformation Atlas",
      content: "Discover how developing countries achieved remarkable export growth. Let's explore the interactive map and its powerful features together.",
      position: "center",
      highlight: null
    },
    {
      title: "Green Dots Mark Success Stories",
      content: "Each green dot represents a country with documented transformation stories. Click on any dot to explore their journey. Countries with multiple sectors show a small orange indicator.",
      position: "left",
      highlight: "dots"
    },
    {
      title: "Search and Filter by Sector",
      content: "Use the search bar to quickly find countries by name. Click 'Show Filters' to filter stories by specific sectors like textiles, electronics, or agriculture. Filtered markers will display in sector-specific colors.",
      position: "bottom-right",
      highlight: "search"
    },
    {
      title: "Switch Between 2D and 3D Views",
      content: "Toggle between a traditional 2D map and an interactive 3D globe using the view toggle button. The 3D globe rotates automatically and provides an immersive exploration experience.",
      position: "bottom-left",
      highlight: "3d-toggle"
    },
    {
      title: "Detailed Country Insights",
      content: "Country cards reveal export rankings, growth data, and transformation stories. For countries with multiple sectors, you can browse between different success stories. Click 'View Full Case Study' for comprehensive details.",
      position: "left",
      highlight: "card"
    }
  ];

  // Load a demo story from the actual data
  useEffect(() => {
    const loadDemoStory = async () => {
      try {
        const stories = await fetchSuccessStories();
        // Find Vietnam or use the first available story
        const vietnamStory = stories.find(story => story.country === 'Vietnam');
        const fallbackStory = vietnamStory || stories[0];
        setDemoStoryData(fallbackStory);
      } catch (error) {
        console.error('Failed to load demo story:', error);
      }
    };

    loadDemoStory();
  }, []);

  // Apply visual effects based on current step
  useEffect(() => {
    const applyHighlights = () => {
      // Remove all existing highlights first
      const searchBar = document.querySelector('.tutorial-search-bar') as HTMLElement;
      if (searchBar) {
        searchBar.style.boxShadow = '';
        searchBar.style.border = '';
        searchBar.style.borderRadius = '';
        searchBar.style.background = '';
      }

      const toggle3D = document.querySelector('.tutorial-3d-toggle') as HTMLElement;
      if (toggle3D) {
        toggle3D.style.boxShadow = '';
        toggle3D.style.border = '';
        toggle3D.style.borderRadius = '';
        toggle3D.style.background = '';
      }

      const helpButton = document.querySelector('.tutorial-help-button') as HTMLElement;
      if (helpButton) {
        helpButton.style.boxShadow = '';
        helpButton.style.border = '';
        helpButton.style.borderRadius = '';
        helpButton.style.background = '';
      }

      const storyCard = document.querySelector('.tutorial-story-card') as HTMLElement;
      if (storyCard) {
        storyCard.style.boxShadow = '';
        storyCard.style.border = '';
        storyCard.style.background = '';
        storyCard.style.transform = '';
        storyCard.style.zIndex = '';
        storyCard.style.top = '';
        storyCard.style.height = '';
        storyCard.style.right = '';
        storyCard.style.position = '';
        storyCard.classList.remove('tutorial-card-highlight');
      }

      // Apply highlights based on current step
      if (currentStep === 2) {
        // Highlight search bar and filter area
        if (searchBar) {
          searchBar.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.5), 0 8px 24px rgba(59, 130, 246, 0.4)';
          searchBar.style.border = '2px solid #3b82f6';
          searchBar.style.borderRadius = '12px';
          searchBar.style.background = 'rgba(59, 130, 246, 0.1)';
        }
      } else if (currentStep === 3) {
        // Highlight 3D toggle button
        if (toggle3D) {
          toggle3D.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.5), 0 8px 24px rgba(16, 185, 129, 0.4)';
          toggle3D.style.border = '2px solid #10b981';
          toggle3D.style.borderRadius = '12px';
          toggle3D.style.background = 'rgba(16, 185, 129, 0.1)';
        }
      } else if (currentStep === 4) {
        // Ensure demo story is visible during card step
        if (!demoStory && demoStoryData) {
          onDemoCountrySelect(demoStoryData);
        }
        
        // Position and highlight story card for better visibility during tutorial
        if (storyCard) {
          storyCard.classList.add('tutorial-card-highlight');
          storyCard.style.zIndex = '45'; // Higher than tutorial overlay
          storyCard.style.top = '120px'; // Position below navbar and tutorial
          storyCard.style.height = 'calc(100vh - 140px)'; // Adjust height to fit screen
          storyCard.style.right = '0';
          storyCard.style.position = 'fixed'; // Ensure it's properly positioned
        }
      }
    };

    applyHighlights();

    // Cleanup function
    return () => {
      const searchBar = document.querySelector('.tutorial-search-bar') as HTMLElement;
      if (searchBar) {
        searchBar.style.boxShadow = '';
        searchBar.style.border = '';
        searchBar.style.borderRadius = '';
        searchBar.style.background = '';
      }

      const toggle3D = document.querySelector('.tutorial-3d-toggle') as HTMLElement;
      if (toggle3D) {
        toggle3D.style.boxShadow = '';
        toggle3D.style.border = '';
        toggle3D.style.borderRadius = '';
        toggle3D.style.background = '';
      }

      const storyCard = document.querySelector('.tutorial-story-card') as HTMLElement;
      if (storyCard) {
        storyCard.style.boxShadow = '';
        storyCard.style.border = '';
        storyCard.style.background = '';
        storyCard.style.transform = '';
        storyCard.style.zIndex = '';
        storyCard.style.top = '';
        storyCard.style.height = '';
        storyCard.style.right = '';
        storyCard.style.position = '';
        storyCard.classList.remove('tutorial-card-highlight');
      }
    };
  }, [currentStep, demoStory, demoStoryData, onDemoCountrySelect]);

  const handleNext = () => {
    if (currentStep === 1 && demoStoryData) {
      // Trigger demo for dots step
      onDemoCountrySelect(demoStoryData);
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
        currentStepData.position === 'bottom-left' ? 'bottom-8 left-8' :
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
            {currentStep === 0 && (
              <Button
                variant="outline"
                onClick={handleSkip}
                className="text-gray-600"
              >
                Skip Tour
              </Button>
            )}
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

      {/* Enhanced CSS for story card highlighting */}
      <style>
        {`
          .tutorial-card-highlight {
            animation: tutorial-card-glow 2s ease-in-out infinite alternate !important;
            border: 4px solid #9333ea !important;
            box-shadow: 0 0 0 6px rgba(147, 51, 234, 0.3), 
                        0 0 30px rgba(147, 51, 234, 0.5),
                        0 20px 60px rgba(147, 51, 234, 0.3) !important;
            background: linear-gradient(135deg, rgba(147, 51, 234, 0.05), rgba(147, 51, 234, 0.1)) !important;
            transform: scale(1.02) !important;
          }
          
          @keyframes tutorial-card-glow {
            from {
              box-shadow: 0 0 0 6px rgba(147, 51, 234, 0.3), 
                          0 0 30px rgba(147, 51, 234, 0.5),
                          0 20px 60px rgba(147, 51, 234, 0.3);
            }
            to {
              box-shadow: 0 0 0 8px rgba(147, 51, 234, 0.5), 
                          0 0 40px rgba(147, 51, 234, 0.7),
                          0 25px 80px rgba(147, 51, 234, 0.4);
            }
          }
        `}
      </style>
    </div>
  );
};

export default MapTutorial;
