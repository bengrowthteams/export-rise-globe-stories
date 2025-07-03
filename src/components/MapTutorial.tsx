
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SuccessStory } from '../types/SuccessStory';
import { fetchSuccessStories } from '../services/countryDataService';

interface MapTutorialProps {
  onClose: () => void;
  onDemoCountrySelect: (story: SuccessStory | null) => void;
  demoStory: SuccessStory | null;
  selectedSectors: string[];
  onSectorToggle: (sector: string) => void;
}

const MapTutorial: React.FC<MapTutorialProps> = ({ 
  onClose, 
  onDemoCountrySelect, 
  demoStory,
  selectedSectors,
  onSectorToggle
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [demoStoryData, setDemoStoryData] = useState<SuccessStory | null>(null);

  const steps = [
    {
      title: "Welcome to the Transformation Atlas",
      content: "Discover how countries achieved rapid export growth. This interactive map shows success stories across different sectors.",
      position: "center",
      highlight: null
    },
    {
      title: "Explore Success Stories",
      content: "Green dots mark countries with case studies. Countries with examples in multiple sectors show an orange indicator. Click any dot to explore their journey.",
      position: "left",
      highlight: "dots"
    },
    {
      title: "Search & Filter",
      content: "Search for a specific country using the search bar in the top left. Use the sector filter below to focus on specific industries. Try filtering by 'Electronics' to see only electronics success stories.",
      position: "top-left",
      highlight: "search"
    },
    {
      title: "Story Cards & Detailed Case Studies",
      content: "When you select a country and sector, a card appears showing key metrics. Click 'View Full Case Study' to read our detailed insights on how the country achieved sector growth.",
      position: "right",
      highlight: "story-card"
    }
  ];

  // Load a demo story from the actual data
  useEffect(() => {
    const loadDemoStory = async () => {
      try {
        const stories = await fetchSuccessStories();
        const vietnamStory = stories.find(story => story.country === 'Vietnam');
        const fallbackStory = vietnamStory || stories[0];
        setDemoStoryData(fallbackStory);
      } catch (error) {
        console.error('Failed to load demo story:', error);
      }
    };

    loadDemoStory();
  }, []);

  // Apply visual effects and demo functionality based on current step
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

      // Apply highlights based on current step
      if (currentStep === 1) {
        // Show global view for dots step - don't zoom into any country
        onDemoCountrySelect(null);
      } else if (currentStep === 2) {
        // Clear any existing demo selection to show global view for filter demo
        onDemoCountrySelect(null);
        
        // Highlight search bar and demonstrate filter
        if (searchBar) {
          searchBar.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.5), 0 8px 24px rgba(59, 130, 246, 0.4)';
          searchBar.style.border = '2px solid #3b82f6';
          searchBar.style.borderRadius = '12px';
          searchBar.style.background = 'rgba(59, 130, 246, 0.1)';
        }
        
        // Demonstrate filtering by Electronics sector
        if (!selectedSectors.includes('Electronics')) {
          setTimeout(() => {
            onSectorToggle('Electronics');
          }, 1000);
        }
      } else if (currentStep === 3 && demoStoryData) {
        // Clear any sector filters from demo
        if (selectedSectors.length > 0) {
          selectedSectors.forEach(sector => onSectorToggle(sector));
        }
        
        // Show demo story card for case study step - NOW zoom into country
        onDemoCountrySelect(demoStoryData);
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
    };
  }, [currentStep, demoStory, demoStoryData, onDemoCountrySelect, selectedSectors, onSectorToggle]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    // Clear any demo filters
    if (selectedSectors.length > 0) {
      selectedSectors.forEach(sector => onSectorToggle(sector));
    }
    onDemoCountrySelect(null);
    handleClose();
  };

  const handleClose = () => {
    // Clear any demo filters when closing
    if (selectedSectors.length > 0) {
      selectedSectors.forEach(sector => onSectorToggle(sector));
    }
    
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
        currentStepData.position === 'top-left' ? 'top-20 left-8' :
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
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="text-gray-600"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back
              </Button>
            )}
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
    </div>
  );
};

export default MapTutorial;
