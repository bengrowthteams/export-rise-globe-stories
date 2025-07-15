
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import EnhancedCaseStudyHeader from '@/components/case-study/EnhancedCaseStudyHeader';
import QuantitativeDashboard from '@/components/case-study/QuantitativeDashboard';
import TransformationOverview from '@/components/case-study/TransformationOverview';
import PrivateSectorSection from '@/components/case-study/PrivateSectorSection';
import PublicSectorSection from '@/components/case-study/PublicSectorSection';
import ExternalMarketSection from '@/components/case-study/ExternalMarketSection';
import OutcomesAnalysis from '@/components/case-study/OutcomesAnalysis';
import SourcesBibliography from '@/components/case-study/SourcesBibliography';
import { supabase } from '@/integrations/supabase/client';
import { countryCoordinates } from '@/data/countryCoordinates';
import { countryFlags } from '@/data/countryFlags';
import ReturnStateService from '@/services/returnStateService';
import { toast } from 'sonner';

interface EnhancedCaseStudyData {
  id: number;
  country: string;
  sector: string;
  product: string;
  currentExports2022: number;
  initialExports1995: number;
  globalShare1995: number;
  globalShare2022: number;
  rank1995: number;
  rank2022: number;
  ranksChange: number;
  externalFactors: string;
  externalMarketFactors: string;
  externalActorContribution: string;
  privateSectorGrowth: string;
  privateSectorFirm: string;
  publicSectorActor: string;
  publicSectorPolicy: string;
  outcome: string;
  sources: string;
  successStory: string;
  successfulProduct: string;
  flag: string;
}

const EnhancedCaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseStudyData, setCaseStudyData] = useState<EnhancedCaseStudyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudyData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('Country Data')
          .select('*')
          .eq('Primary key', parseInt(id))
          .maybeSingle();

        if (error) {
          console.error('Error fetching case study:', error);
          toast.error('Failed to load case study data');
          setLoading(false);
          return;
        }

        if (!data) {
          console.log('No case study found for ID:', id);
          setLoading(false);
          return;
        }

        const coordinates = countryCoordinates[data.Country || ''] || { lat: 0, lng: 0 };
        const flag = countryFlags[data.Country || ''] || '🏳️';

        const enhancedData: EnhancedCaseStudyData = {
          id: data['Primary key'] || 0,
          country: data.Country || '',
          sector: data.Sector || '',
          product: data['Successful product'] || '',
          currentExports2022: data['Current Exports - 2022 (USD)'] || 0,
          initialExports1995: data['Initial Exports - 1995 (USD)'] || 0,
          globalShare1995: data['Global Share 1995 - %'] || 0,
          globalShare2022: data['Global Share 2022 - %'] || 0,
          rank1995: data['Rank (1995)'] || 0,
          rank2022: data['Rank (2022)'] || 0,
          ranksChange: data['Ranks Change (absolute)'] || 0,
          externalFactors: data['External Factors - One Bullet Summary'] || '',
          externalMarketFactors: data['External Market Factors'] || '',
          externalActorContribution: data['External Actor Contribution'] || '',
          privateSectorGrowth: data['Private Sector Industry Growth'] || '',
          privateSectorFirm: data['Private Sector Pioneering Firm'] || '',
          publicSectorActor: data['Public Sector Actor'] || '',
          publicSectorPolicy: data['Public Sector Policy'] || '',
          outcome: data.Outcome || '',
          sources: data.Sources || '',
          successStory: data['Success Story (1 sentence summary)'] || '',
          successfulProduct: data['Successful product'] || '',
          flag
        };

        setCaseStudyData(enhancedData);
      } catch (error) {
        console.error('Failed to load case study:', error);
        toast.error('Failed to load case study data');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudyData();
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Button 
            onClick={handleBackToMap}
            variant="ghost" 
            className="mb-2"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Map
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <EnhancedCaseStudyHeader 
          flag={caseStudyData.flag}
          country={caseStudyData.country}
          sector={caseStudyData.sector}
          successfulProduct={caseStudyData.product}
          rank1995={caseStudyData.rank1995}
          rank2022={caseStudyData.rank2022}
          initialExports1995={caseStudyData.initialExports1995}
          currentExports2022={caseStudyData.currentExports2022}
          globalShare1995={caseStudyData.globalShare1995}
          globalShare2022={caseStudyData.globalShare2022}
        />

        <QuantitativeDashboard 
          initialExports1995={caseStudyData.initialExports1995}
          currentExports2022={caseStudyData.currentExports2022}
          globalShare1995={caseStudyData.globalShare1995}
          globalShare2022={caseStudyData.globalShare2022}
          rank1995={caseStudyData.rank1995}
          rank2022={caseStudyData.rank2022}
        />

        <TransformationOverview 
          successStory={caseStudyData.successStory}
          externalFactors={caseStudyData.externalFactors}
          privateSectorGrowth={caseStudyData.privateSectorGrowth}
          publicSectorPolicy={caseStudyData.publicSectorPolicy}
        />

        <PrivateSectorSection 
          privateSectorGrowth={caseStudyData.privateSectorGrowth}
          privateSectorFirm={caseStudyData.privateSectorFirm}
        />

        <PublicSectorSection 
          publicSectorActor={caseStudyData.publicSectorActor}
          publicSectorPolicy={caseStudyData.publicSectorPolicy}
        />

        <ExternalMarketSection 
          externalFactors={caseStudyData.externalFactors}
          externalMarketFactors={caseStudyData.externalMarketFactors}
          externalActorContribution={caseStudyData.externalActorContribution}
        />

        <OutcomesAnalysis outcome={caseStudyData.outcome} />

        <SourcesBibliography sources={caseStudyData.sources} />
      </div>
    </div>
  );
};

export default EnhancedCaseStudy;
