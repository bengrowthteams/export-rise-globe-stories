
import { useState, useEffect } from 'react';

export const useTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(true);
  const [shouldAutoTrigger, setShouldAutoTrigger] = useState(false);

  useEffect(() => {
    // Check if user has seen tutorial before
    const tutorialSeen = localStorage.getItem('map-tutorial-seen');
    const hasSeenBefore = tutorialSeen === 'true';
    
    console.log('Tutorial state - hasSeenBefore:', hasSeenBefore);
    
    setHasSeenTutorial(hasSeenBefore);
    setShouldAutoTrigger(!hasSeenBefore);
  }, []);

  const startTutorial = () => {
    console.log('Starting tutorial');
    setShowTutorial(true);
    setShouldAutoTrigger(false);
  };

  const closeTutorial = () => {
    console.log('Closing tutorial');
    setShowTutorial(false);
    localStorage.setItem('map-tutorial-seen', 'true');
    setHasSeenTutorial(true);
    setShouldAutoTrigger(false);
  };

  const resetTutorial = () => {
    localStorage.removeItem('map-tutorial-seen');
    setHasSeenTutorial(false);
    setShouldAutoTrigger(true);
  };

  return {
    showTutorial,
    hasSeenTutorial,
    shouldAutoTrigger,
    startTutorial,
    closeTutorial,
    resetTutorial
  };
};
