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
    <section id="case-spotlights" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-950 border border-emerald-900 rounded-full px-4 py-1.5 mb-4">
            Editor's Picks
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Case Spotlights
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mb-5"></div>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
            Start by exploring notable export boom stories from around the world
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-6">
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
            className="absolute -left-2 top-1/2 -translate-y-1/2 bg-gray-800 shadow-lg hover:shadow-xl disabled:opacity-20 z-10 border border-white/10 hover:border-emerald-500/50 hover:bg-gray-700 transition-all duration-200 w-10 h-10 rounded-full"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-gray-300" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute -right-2 top-1/2 -translate-y-1/2 bg-gray-800 shadow-lg hover:shadow-xl disabled:opacity-20 z-10 border border-white/10 hover:border-emerald-500/50 hover:bg-gray-700 transition-all duration-200 w-10 h-10 rounded-full"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </Button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-green-600 w-8'
                  : 'bg-gray-200 hover:bg-gray-300 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
