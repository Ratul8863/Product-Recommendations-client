import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HomeSlider = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  
  const slides = [
  {
    image: "https://images.unsplash.com/photo-1607083206173-2f9ce7d2a6f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    // A person browsing e-commerce products on a tablet — very relevant to asking for product recommendations
    title: "Get Insightful Product Recommendations",
    subtitle: "Ask about any product and get real suggestions from the community.",
  },
  {
    image: "https://images.unsplash.com/photo-1585655851322-d9b6f3d2f3e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    // Side-by-side screen comparison — great fit for comparing product alternatives
    title: "Compare and Choose Better",
    subtitle: "Discover high-quality alternatives and make smarter purchases.",
  },
  {
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    // Friendly people having a discussion — fits community sharing vibe
    title: "Join a Helpful Community",
    subtitle: "Share your knowledge and help others shop wisely.",
  },
];






  return (
    <section className="max-w-8xl mx-auto px-4 mt-6">
      <Slider {...sliderSettings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-64 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover brightness-75" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg md:text-xl max-w-xl">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HomeSlider;
