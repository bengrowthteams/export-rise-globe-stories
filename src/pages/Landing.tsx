
import React from 'react';
import Header from '../components/Header';
import WorldMap from '../components/WorldMap';
import StatsOverview from '../components/StatsOverview';
import AboutSection from '../components/AboutSection';
import GetInTouchSection from '../components/GetInTouchSection';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <WorldMap />
      <StatsOverview />
      <AboutSection />
      <GetInTouchSection />
    </div>
  );
};

export default Landing;
