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

  // https://i.ibb.co/sd3ywHGM/large-group-cooking-valentines-class-2-Kitchen-on-Fire.webp
  //https://i.ibb.co/xtWtcVFd/happy-woman-yellow-dress.jpg
// https://i.ibb.co/Fqk2Btyr/happy-woman-yellow-sweater.jpg

  const slides = [
  {
    image: "",
    // title: "Get Insightful Product Recommendations",
    // subtitle: "Ask about any product and get real suggestions from the community.",
  },
  {
    image: "",
    // title: "Compare and Choose Better",
    // subtitle: "Discover high-quality alternatives and make smarter purchases.",
  },
  {
    image: "",
    // title: "Join a Helpful Community",
    // subtitle: "Share your knowledge and help others shop wisely.",
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
