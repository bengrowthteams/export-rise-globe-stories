import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { editorsPicks } from '@/data/editorsPicks';
import { Button } from './ui/button';

export const CaseSpotlightsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);


  return (
    <section id="case-spotlights" className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Case Spotlights
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 max-w-4xl mx-auto px-4">
            Start by exploring our Editor's Picks of notable export boom stories around the world
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {editorsPicks.map((pick, index) => (
                <div
                  key={`${pick.country}-${pick.sector}-${index}`}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3"
                >
                  <SpotlightCard {...pick} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 sm:top-1/2 sm:-translate-y-1/2 top-[40%] bg-white shadow-xl hover:shadow-2xl disabled:opacity-30 z-10 border-2 border-blue-500 hover:bg-blue-50 hover:border-blue-600 transition-all duration-300 w-12 h-12"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-7 h-7 text-blue-600" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 sm:top-1/2 sm:-translate-y-1/2 top-[40%] bg-white shadow-xl hover:shadow-2xl disabled:opacity-30 z-10 border-2 border-blue-500 hover:bg-blue-50 hover:border-blue-600 transition-all duration-300 w-12 h-12"
            aria-label="Next slide"
          >
            <ChevronRight className="w-7 h-7 text-blue-600" />
          </Button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
