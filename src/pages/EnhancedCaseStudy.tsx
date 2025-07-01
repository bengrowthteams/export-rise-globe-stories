import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { fetchCaseStudyData, CaseStudyData, getAvailableCaseStudyIds } from '../services/caseStudyService';
import EnhancedCaseStudyHeader from '../components/case-study/EnhancedCaseStudyHeader';
import KeyHighlightsSection from '../components/case-study/KeyHighlightsSection';
import CompactOutcomesDashboard from '../components/case-study/CompactOutcomesDashboard';
import DetailedAnalysisSection from '../components/case-study/DetailedAnalysisSection';
import PerformanceDashboard from '../components/case-study/PerformanceDashboard';
import SourcesBibliography from '../components/case-study/SourcesBibliography';
import ReturnStateService from '../services/returnStateService';

const EnhancedCaseStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [caseStudyData, setCaseStudyData] = useState<CaseStudyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Capture and preserve incoming state for seamless return
  useEffect(() => {
    console.log('Enhanced Case Study - Capturing incoming state:', location.state);
    
    if (location.state) {
      // Store the comprehensive state for return navigation
      ReturnStateService.saveReturnState(location.state);
      console.log('Enhanced Case Study - Stored return state via service');
    }
  }, [location.state]);

  useEffect(() => {
    const loadCaseStudy = async () => {
      console.log('Loading case study for ID:', id);
      
      const primaryKey = parseInt(id || '0');
      const availableIds = getAvailableCaseStudyIds();
      
      if (!availableIds.includes(primaryKey)) {
        setError('Case study not available. Only the first 5 case studies are implemented.');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchCaseStudyData(primaryKey);
        if (data) {
          setCaseStudyData(data);
        } else {
          setError('Case study data not found.');
        }
      } catch (err) {
        console.error('Error loading case study:', err);
        setError('Failed to load case study data.');
      } finally {
        setLoading(false);
      }
    };

    loadCaseStudy();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={32} />
          <p className="text-gray-600">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (error || !caseStudyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Case Study Not Available</h1>
          <p className="text-gray-600 mb-6">{error || 'Case study data not found'}</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedCaseStudyHeader
        flag={caseStudyData.flag}
        country={caseStudyData.country}
        sector={caseStudyData.sector}
        successfulProduct={caseStudyData.successfulProduct}
        rank1995={caseStudyData.rank1995}
        rank2022={caseStudyData.rank2022}
        initialExports1995={caseStudyData.initialExports1995}
        currentExports2022={caseStudyData.currentExports2022}
        globalShare1995={caseStudyData.globalShare1995}
        globalShare2022={caseStudyData.globalShare2022}
      />

      <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
        <CompactOutcomesDashboard
          outcome={caseStudyData.outcome}
          rank1995={caseStudyData.rank1995}
          rank2022={caseStudyData.rank2022}
          initialExports1995={caseStudyData.initialExports1995}
          currentExports2022={caseStudyData.currentExports2022}
          globalShare1995={caseStudyData.globalShare1995}
          globalShare2022={caseStudyData.globalShare2022}
        />

        <KeyHighlightsSection
          publicSectorSummary={caseStudyData.publicSectorSummary}
          privateSectorSummary={caseStudyData.privateSectorSummary}
          externalFactorsSummary={caseStudyData.externalFactorsSummary}
        />

        <DetailedAnalysisSection
          publicSectorPolicy={caseStudyData.publicSectorPolicy}
          publicSectorActor={caseStudyData.publicSectorActor}
          privateSectorPioneeringFirm={caseStudyData.privateSectorPioneeringFirm}
          privateSectorIndustryGrowth={caseStudyData.privateSectorIndustryGrowth}
          externalMarketFactors={caseStudyData.externalMarketFactors}
          externalActorContribution={caseStudyData.externalActorContribution}
        />

        <PerformanceDashboard
          rank1995={caseStudyData.rank1995}
          rank2022={caseStudyData.rank2022}
          initialExports1995={caseStudyData.initialExports1995}
          currentExports2022={caseStudyData.currentExports2022}
          globalShare1995={caseStudyData.globalShare1995}
          globalShare2022={caseStudyData.globalShare2022}
        />

        <SourcesBibliography
          sources={caseStudyData.sources}
        />
      </div>
    </div>
  );
};

export default EnhancedCaseStudy;
