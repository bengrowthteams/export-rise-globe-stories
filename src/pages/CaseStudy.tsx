
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import CaseStudyHeader from '@/components/case-study/CaseStudyHeader';
import KeyHighlightsSection from '@/components/case-study/KeyHighlightsSection';
import DetailedAnalysisSection from '@/components/case-study/DetailedAnalysisSection';
import OutcomesSection from '@/components/case-study/OutcomesSection';
import FurtherReadingSection from '@/components/case-study/FurtherReadingSection';
import { fetchCaseStudyData, CaseStudyData } from '@/services/caseStudyService';
import ReturnStateService from '@/services/returnStateService';
import { toast } from 'sonner';
import { countryFlags } from '@/data/countryFlags';

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseStudyData, setCaseStudyData] = useState<CaseStudyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCaseStudy = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchCaseStudyData(id);
        setCaseStudyData(data);
      } catch (error) {
        console.error('Failed to load case study:', error);
        toast.error('Failed to load case study data');
      } finally {
        setLoading(false);
      }
    };

    loadCaseStudy();
  }, [id]);

  const handleBackToMap = () => {
    ReturnStateService.clearReturnState();
    navigate('/', { 
      state: { scrollToMap: true }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!caseStudyData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
          <p className="text-gray-600 mb-6">The case study you're looking for doesn't exist.</p>
          <Button onClick={handleBackToMap} className="bg-green-600 hover:bg-green-700">
            <ArrowLeft className="mr-2" size={16} />
            Back to Map
          </Button>
        </div>
      </div>
    );
  }

  const flag = countryFlags[caseStudyData.country] || '🏳️';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <CaseStudyHeader 
          flag={flag}
          country={caseStudyData.country}
          sector={caseStudyData.sector}
          successfulProduct={caseStudyData.product}
          onNavigateBack={handleBackToMap}
        />

        <KeyHighlightsSection 
          publicSectorSummary={caseStudyData.publicSectorActor}
          privateSectorSummary={caseStudyData.privateSectorGrowth}
          externalFactorsSummary={caseStudyData.externalFactors}
        />

        <DetailedAnalysisSection 
          publicSectorPolicy={caseStudyData.publicSectorPolicy}
          publicSectorActor={caseStudyData.publicSectorActor}
          privateSectorPioneeringFirm={caseStudyData.privateSectorFirm}
          privateSectorIndustryGrowth={caseStudyData.privateSectorGrowth}
          externalMarketFactors={caseStudyData.externalFactors}
          externalActorContribution={caseStudyData.externalFactors}
        />

        <OutcomesSection outcome={caseStudyData.outcome} />

        <FurtherReadingSection sources={caseStudyData.sources} />
      </div>
    </div>
  );
};

export default CaseStudy;
