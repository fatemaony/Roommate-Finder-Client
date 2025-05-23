import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Banner = () => {
  // Sample events data - replace with your actual data loading logic
  const [events] = useState([
    {
      id: 1,
      prime_location: "Gulshan, Dhaka",
      description: "Modern 2BR/2BA with city views, gym, and rooftop terrace. Perfect for young professionals.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      prime_location: "Chattogram",
      description: "Affordable studio apartment just 5 minutes from university. Great for students.",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      prime_location: "Uttara, Dhaka",
      description: "Beautiful 3BR house with private garden and parking. Ideal for small families.",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [events.length, isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? events.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === events.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (!events || events.length === 0) {
    return (
      <div className="px-4 md:px-10 lg:px-40 py-8">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] bg-gray-200 rounded-2xl flex items-center justify-center">
          <p className="text-gray-500">No events available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 lg:px-40 py-8">
      <div className="relative w-full overflow-hidden rounded-2xl shadow-xl">
        
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[32rem]">
          
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {events.map((event) => (
              <div key={event.id} className="relative flex-shrink-0 w-full h-full">
                
                <div className="relative w-full h-full">
                  <img
                    src={event.image}
                    className="absolute w-full h-full object-cover"
                    alt={event.prime_location}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>

                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-lg animate-fade-in">
                    {event.prime_location}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-8 max-w-md sm:max-w-xl md:max-w-2xl drop-shadow-md opacity-90">
                    {event.description}
                  </p>
                  <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          
          <div className="absolute flex justify-between w-full px-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <button
              onClick={goToPrevious}
              className="bg-black/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-black/50 transition-all duration-300 transform hover:scale-110 pointer-events-auto group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={goToNext}
              className="bg-black/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-black/50 transition-all duration-300 transform hover:scale-110 pointer-events-auto group"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/50 transition-all duration-300"
            aria-label={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
          >
            {isAutoPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Banner;