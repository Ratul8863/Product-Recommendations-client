import React, { useState, useEffect } from 'react';

const HomeSlider = () => {
  // State to keep track of the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define the slide content with vibrant placeholder images and updated copy
  const slides = [
    {
      // Using abstract placeholder images for a more cinematic feel
      image: "https://placehold.co/1200x500/1a202c/e2e8f0?text=Explore+New+Products", // Dark blue-gray, light text
      title: "Explore What's Next in Products",
      subtitle: "Dive into a world of curated recommendations, just for you.",
    },
    {
      image: "https://placehold.co/1200x500/2d3748/cbd5e0?text=Your+Smart+Guide", // Darker blue-gray, slightly darker light text
      title: "Your Smart Shopping Companion",
      subtitle: "Compare, decide, and purchase with absolute confidence.",
    },
    {
      image: "https://placehold.co/1200x500/4a5568/a0aec0?text=Connect+and+Share", // Even darker blue-gray, lighter gray text
      title: "Connect, Share, and Empower",
      subtitle: "Join a vibrant community of savvy shoppers and experts.",
    },
  ];

  // Function to go to the previous slide
  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  // Function to go to the next slide
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Effect for autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      // Advance to the next slide, looping back to the first if at the end
      goToNextSlide();
    }, 5000); // Increased autoplay speed to 5 seconds for a slower, cinematic feel

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [slides.length]); // Added slides.length to dependencies

  return (
    <section className="max-w-8xl mx-auto px-4 mt-8 font-inter">
      <div className="relative h-64 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
        {/* Render each slide with subtle animation */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1200 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
            }`}
          >
            {/* Background image with a subtle zoom and strong, dark gradient overlay */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-1200 ease-out ${
                index === currentSlide ? 'scale-105' : 'scale-100'
              }`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/1200x500/222222/FFFFFF?text=Image+Not+Available`;
              }}
            />
            {/* Stronger, linear gradient overlay for dramatic contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end items-start text-white p-6 md:p-12 text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 md:mb-4 drop-shadow-xl leading-tight">
                {slide.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl max-w-xl md:max-w-2xl drop-shadow-lg opacity-95">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* Previous Button */}
        <button
          onClick={goToPreviousSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-r-lg transition-all duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
          aria-label="Previous Slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={goToNextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-l-lg transition-all duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
          aria-label="Next Slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Enhanced navigation dots */}
      <div className="flex justify-center mt-6 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 transform ${
              index === currentSlide
                ? 'bg-indigo-600 scale-125 shadow-md'
                : 'bg-gray-400 hover:bg-indigo-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeSlider;
