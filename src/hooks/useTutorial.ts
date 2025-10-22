
import { useState, useEffect, useRef } from 'react';

export const useTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(true);
  const [shouldAutoTrigger, setShouldAutoTrigger] = useState(false);
  const hasAutoTriggered = useRef(false);

  useEffect(() => {
    // Tutorial will not auto-trigger, only manual activation
    const tutorialSeen = localStorage.getItem('map-tutorial-seen');
    const hasSeenBefore = tutorialSeen === 'true';
    
    console.log('Tutorial state - hasSeenBefore:', hasSeenBefore);
    
    setHasSeenTutorial(true); // Always set to true to prevent auto-trigger
    setShouldAutoTrigger(false); // Disable auto-trigger
  }, []);

  const startTutorial = () => {
    console.log('Starting tutorial');
    setShowTutorial(true);
    setShouldAutoTrigger(false);
    hasAutoTriggered.current = true;
  };

  const triggerTutorialIfNeeded = () => {
    console.log('Trigger tutorial if needed - shouldAutoTrigger:', shouldAutoTrigger, 'hasAutoTriggered:', hasAutoTriggered.current);
    
    if (shouldAutoTrigger && !hasAutoTriggered.current && !showTutorial) {
      console.log('Auto-triggering tutorial');
      startTutorial();
      return true;
    }
    return false;
  };

  const closeTutorial = () => {
    console.log('Closing tutorial');
    setShowTutorial(false);
    localStorage.setItem('map-tutorial-seen', 'true');
    setHasSeenTutorial(true);
    setShouldAutoTrigger(false);
    hasAutoTriggered.current = true;
  };

  const resetTutorial = () => {
    localStorage.removeItem('map-tutorial-seen');
    setHasSeenTutorial(false);
    setShouldAutoTrigger(true);
    hasAutoTriggered.current = false;
  };

  return {
    showTutorial,
    hasSeenTutorial,
    shouldAutoTrigger,
    startTutorial,
    closeTutorial,
    resetTutorial,
    triggerTutorialIfNeeded
  };
};
