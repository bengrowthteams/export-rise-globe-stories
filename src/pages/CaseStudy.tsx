import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { successStories } from '../data/successStories';
import { getAvailableCaseStudyIds } from '../services/caseStudyService';
import CaseStudyHeader from '../components/case-study/CaseStudyHeader';
import TransformationOverview from '../components/case-study/TransformationOverview';
import SuccessStorySummary from '../components/case-study/SuccessStorySummary';
import PublicSectorSection from '../components/case-study/PublicSectorSection';
import PrivateSectorSection from '../components/case-study/PrivateSectorSection';
import ExternalMarketSection from '../components/case-study/ExternalMarketSection';
import OutcomesSection from '../components/case-study/OutcomesSection';
import FurtherReadingSection from '../components/case-study/FurtherReadingSection';

const CaseStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Check if this ID should use the enhanced version
  useEffect(() => {
    const primaryKey = parseInt(id || '0');
    const availableIds = getAvailableCaseStudyIds();
    
    if (availableIds.includes(primaryKey)) {
      navigate(`/enhanced-case-study/${id}`, { replace: true });
      return;
    }
  }, [id, navigate]);
  
  const story = successStories.find(s => s.id === id);

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Map
          </button>
        </div>
      </div>
    );
  };

  const handleNavigateBack = () => {
    navigate('/map');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CaseStudyHeader
        flag={story.flag}
        country={story.country}
        sector={story.sector}
        successfulProduct={story.successfulProduct}
        onNavigateBack={handleNavigateBack}
      />

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <TransformationOverview
          globalRanking1995={story.globalRanking1995}
          globalRanking2022={story.globalRanking2022}
          initialExports1995={story.initialExports1995}
          initialExports2022={story.initialExports2022}
        />

        <SuccessStorySummary summary={story.successStorySummary} />

        <PublicSectorSection />

        <PrivateSectorSection />

        <ExternalMarketSection />

        <OutcomesSection />

        <FurtherReadingSection />
      </div>
    </div>
  );
};

export default CaseStudy;
