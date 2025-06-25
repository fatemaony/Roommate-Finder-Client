import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Banner = () => {
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

  return (
    <div className="px-4 md:px-10 py-8">
      <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-base-100">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px]">
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {events.map((event) => (
              <motion.div
                key={event.id}
                className="relative flex-shrink-0 w-full h-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={event.image}
                    className="absolute w-full h-full object-cover rounded-2xl"
                    alt={event.prime_location}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop';
                    }}
                  />
                  {/* Darker and more solid overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20 rounded-2xl"></div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 sm:p-8 space-y-4">
                  <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] animate-fade-in"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {event.prime_location}
                  </motion.h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl opacity-95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                    {event.description}
                  </p>
                  <button className="btn btn-secondary px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                    <Link to={"/browselisting"}>View Details</Link>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="absolute flex justify-between w-full px-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <button
              onClick={goToPrevious}
              className="bg-black/40 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-purple-600 transition-all duration-300 transform hover:scale-110 pointer-events-auto group shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 group-hover:scale-125 transition-transform duration-300" />
            </button>
            <button
              onClick={goToNext}
              className="bg-black/40 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-purple-600 transition-all duration-300 transform hover:scale-110 pointer-events-auto group shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 group-hover:scale-125 transition-transform duration-300" />
            </button>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                  index === currentIndex
                    ? 'bg-purple-600 border-white scale-125'
                    : 'bg-white/30 border-white hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Play/Pause button */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full hover:bg-purple-600 transition-all duration-300"
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
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Banner;
