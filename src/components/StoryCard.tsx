
import React from 'react';
import { CountrySuccessStories, SectorStory } from '../types/CountrySuccessStories';
import { SuccessStory } from '../types/SuccessStory';
import LegacyStoryCard from './story-card/LegacyStoryCard';
import MultiSectorStoryCard from './story-card/MultiSectorStoryCard';

interface StoryCardProps {
  story: SuccessStory | null;
  countryStories?: CountrySuccessStories | null;
  selectedSector?: SectorStory | null;
  selectedSectors?: string[];
  onClose: () => void;
  onReadMore: (story: SuccessStory) => void;
  onSectorChange?: (sector: SectorStory) => void;
  onClearPopups?: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ 
  story, 
  countryStories,
  selectedSector,
  selectedSectors = [],
  onClose, 
  onReadMore,
  onSectorChange,
  onClearPopups
}) => {
  const handleClose = () => {
    if (onClearPopups) {
      onClearPopups();
    }
    onClose();
  };

  // Handle legacy single-sector stories
  if (story && !countryStories) {
    return (
      <LegacyStoryCard 
        story={story} 
        selectedSectors={selectedSectors}
        onClose={handleClose} 
        onReadMore={onReadMore} 
      />
    );
  }

  // Handle multi-sector country stories
  if (countryStories && selectedSector) {
    return (
      <MultiSectorStoryCard 
        countryStories={countryStories}
        selectedSector={selectedSector}
        selectedSectors={selectedSectors}
        onClose={handleClose}
        onReadMore={onReadMore}
        onSectorChange={onSectorChange}
      />
    );
  }

  return null;
};

export default StoryCard;
