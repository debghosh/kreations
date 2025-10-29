import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Carousel images - Replace with your actual product images
  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1602874801006-90c27c6e0ca5?w=1920&q=80',
      alt: 'Handcrafted Candles'
    },
    {
      url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1920&q=80',
      alt: 'Artisan Wax Products'
    },
    {
      url: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=1920&q=80',
      alt: 'Resin Art Pieces'
    },
    {
      url: 'https://images.unsplash.com/photo-1621784564315-d2a91e3bb134?w=1920&q=80',
      alt: 'Handmade Crafts'
    },
    {
      url: 'https://images.unsplash.com/photo-1589010588553-46e8e7c21788?w=1920&q=80',
      alt: 'Artisan Collections'
    }
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, carouselImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
          </div>
        ))}
      </div>

      {/* Hero Content - "Handcrafted with Soul" */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
            Handcrafted with Soul
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-lg">
            Unique wax and resin creations made with passion and care
          </p>
          <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl">
            Explore Collection
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators (Dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter (Optional) */}
      <div className="absolute top-4 right-4 z-20 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full text-white text-sm">
        {currentSlide + 1} / {carouselImages.length}
      </div>
    </div>
  );
};

export default HeroCarousel;
