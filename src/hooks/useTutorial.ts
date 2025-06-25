
import { useState, useEffect } from 'react';

export const useTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(true);

  useEffect(() => {
    // Check if user has seen tutorial before
    const tutorialSeen = localStorage.getItem('map-tutorial-seen');
    const hasSeenBefore = tutorialSeen === 'true';
    
    setHasSeenTutorial(hasSeenBefore);
    
    if (!hasSeenBefore) {
      // Small delay to let the page load
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const startTutorial = () => {
    setShowTutorial(true);
  };

  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('map-tutorial-seen', 'true');
    setHasSeenTutorial(true);
  };

  const resetTutorial = () => {
    localStorage.removeItem('map-tutorial-seen');
    setHasSeenTutorial(false);
  };

  return {
    showTutorial,
    hasSeenTutorial,
    startTutorial,
    closeTutorial,
    resetTutorial
  };
};
