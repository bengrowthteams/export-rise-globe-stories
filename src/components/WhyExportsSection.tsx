import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Map, TrendingUp, Globe, Zap } from 'lucide-react';

const WhyExportsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  const cardStyle = {
    height: '60vh',
    maxHeight: '600px',
    borderRadius: '20px',
    transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
    willChange: 'transform, opacity'
  };

  const handleExploreMap = () => {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
      const navHeight = 56;
      const elementPosition = mapSection.offsetTop;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    const handleScroll = () => {
      if (!ticking.current) {
        lastScrollY.current = window.scrollY;
        
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          
          const sectionRect = sectionRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollDistance = viewportHeight * 2;
          
          let progress = 0;
          if (sectionRect.top <= 0) {
            progress = Math.min(1, Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance));
          }
          
          if (progress >= 0.66) {
            setActiveCardIndex(2);
          } else if (progress >= 0.33) {
            setActiveCardIndex(1);
          } else {
            setActiveCardIndex(0);
          }
          
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const isFirstCardVisible = isIntersecting;
  const isSecondCardVisible = activeCardIndex >= 1;
  const isThirdCardVisible = activeCardIndex >= 2;

  return (
    <div 
      ref={sectionRef} 
      className="relative" 
      style={{ height: '300vh' }}
      id="why-exports-section"
    >
      <section className="w-full h-screen py-10 md:py-16 sticky top-0 overflow-hidden bg-gradient-to-b from-white to-green-50">
        <div className="container px-6 lg:px-8 mx-auto h-full flex flex-col">
          <div className="mb-6 md:mb-8">
            <div className="pulse-chip opacity-0 animate-fade-in mb-4">
              <span>Export Success Stories</span>
            </div>
            <h2 className="section-title">Why Exports?</h2>
          </div>
          
          <div ref={cardsContainerRef} className="relative flex-1 perspective-1000">
            {/* Products to prosperity */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-xl ${isFirstCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                zIndex: 10,
                transform: `translateY(${isFirstCardVisible ? '90px' : '200px'}) scale(0.9)`,
                opacity: isFirstCardVisible ? 0.9 : 0
              }}
            >
              <div 
                className="absolute inset-0 z-0 bg-gradient-to-b from-green-900/40 to-green-900/80"
                style={{
                  backgroundImage: "url('/lovable-uploads/7f7ef23d-aeab-43c4-aa15-85f7967835c5.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundBlendMode: "overlay"
                }}
              />
              
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                  <TrendingUp size={16} className="mr-2" />
                  <span className="text-sm font-medium">Growth</span>
                </div>
              </div>
              
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                <div className="max-w-lg">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                    Products to prosperity
                  </h3>
                  <p className="text-green-50 text-base sm:text-lg leading-relaxed">
                    Structural change happens when countries produce new things with new technologies, 
                    shifting workers into more sophisticated sectors and jobs. A clear signal is an export boom.
                  </p>
                </div>
              </div>
            </div>
            
            {/* The export edge */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-xl ${isSecondCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                zIndex: 20,
                transform: `translateY(${isSecondCardVisible ? activeCardIndex === 1 ? '55px' : '45px' : '200px'}) scale(0.95)`,
                opacity: isSecondCardVisible ? 1 : 0,
                pointerEvents: isSecondCardVisible ? 'auto' : 'none'
              }}
            >
              <div 
                className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/40 to-blue-900/80"
                style={{
                  backgroundImage: "url('/lovable-uploads/c515d203-be93-46ac-9f21-8ef7def9a637.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundBlendMode: "overlay"
                }}
              />
              
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                  <Globe size={16} className="mr-2" />
                  <span className="text-sm font-medium">Global</span>
                </div>
              </div>
              
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                <div className="max-w-lg">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                    The export edge
                  </h3>
                  <p className="text-blue-50 text-base sm:text-lg leading-relaxed">
                    Global markets dwarf domestic demand–particularly in developing nations–enabling economies of scale, 
                    which fosters global competitiveness and drives innovation.
                  </p>
                </div>
              </div>
            </div>
            
            {/* What sparks a boom */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-xl ${isThirdCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                zIndex: 30,
                transform: `translateY(${isThirdCardVisible ? activeCardIndex === 2 ? '15px' : '0' : '200px'}) scale(1)`,
                opacity: isThirdCardVisible ? 1 : 0,
                pointerEvents: isThirdCardVisible ? 'auto' : 'none'
              }}
            >
              <div 
                className="absolute inset-0 z-0 bg-gradient-to-b from-purple-900/40 to-purple-900/80"
                style={{
                  backgroundImage: "url('/lovable-uploads/05b38d20-8ee5-48fe-b170-df7a629e7a8f.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundBlendMode: "overlay"
                }}
              />
              
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                  <Zap size={16} className="mr-2" />
                  <span className="text-sm font-medium">Breakthrough</span>
                </div>
              </div>
              
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center justify-between">
                <div className="max-w-lg">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                    What sparks a boom
                  </h3>
                  <p className="text-purple-50 text-base sm:text-lg leading-relaxed mb-6">
                    Big export jumps don't happen by accident. When pioneering firms, government strategy, 
                    and global opportunities align, sectors take off and exports surge.
                  </p>
                  <Button 
                    onClick={handleExploreMap}
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-3 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Map className="mr-2" size={20} />
                    Explore the Map
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyExportsSection;