
import Header from "@/components/Header";
import WorldMap from "@/components/WorldMap";
import NavigationBar from "@/components/NavigationBar";
import SectorSidebar from "@/components/SectorSidebar";
import StoryPanel from "@/components/StoryPanel";
import StatsOverview from "@/components/StatsOverview";
import AboutSection from "@/components/AboutSection";
import GetInTouchSection from "@/components/GetInTouchSection";
import MapTutorial from "@/components/MapTutorial";
import MapViewToggle from "@/components/MapViewToggle";
import { useTutorial } from "@/hooks/useTutorial";
import { useElementHighlight } from "@/hooks/useElementHighlight";

const Landing = () => {
  const { showTutorial, currentStep, nextStep, closeTutorial } = useTutorial();
  useElementHighlight(showTutorial, currentStep);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <NavigationBar />
      
      <div className="flex flex-col lg:flex-row h-[calc(100vh-120px)]">
        <SectorSidebar />
        
        <div className="flex-1 relative">
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <MapViewToggle />
          </div>
          <WorldMap />
          <StoryPanel />
        </div>
      </div>
      
      <StatsOverview />
      <AboutSection />
      <GetInTouchSection />
      
      {showTutorial && (
        <MapTutorial
          currentStep={currentStep}
          onNext={nextStep}
          onClose={closeTutorial}
        />
      )}
    </div>
  );
};

export default Landing;
