import { useState, useEffect } from "react";
import { AllImages } from "../../public/images/AllImages";
import TestimonialCard from "./TestimonialCard";

// Testimonial Data
const testimonials = [
  {
    text: "Oriboshi has been our go-to platform for every astrophotography project. We can’t imagine working without it.",
    name: "Koray Okumus",
    image: AllImages.profile,
  },
  {
    text: "Using Oriboshi has transformed the way I capture the stars. It's intuitive and powerful – perfect for night sky enthusiasts.",
    name: "Lina Sterling",
    image: AllImages.profile,
  },
  {
    text: "The community features and resource library on Oriboshi are unmatched. It's a hub for learning and sharing.",
    name: "Rajiv Ahluwalia",
    image: AllImages.profile,
  },
  {
    text: "I’ve published my best work yet thanks to the tools available on Oriboshi. Highly recommend it for any serious astrophotographer.",
    name: "Claire Beauchamp",
    image: AllImages.profile,
  },
  {
    text: "From tracking star movements to editing captures, Oriboshi offers everything needed for astrophotography at a professional level.",
    name: "Tomás Herrero",
    image: AllImages.profile,
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Change the slide automatically every 2.5 seconds unless hovered
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        {/* Slide Container */}
        <div className="flex transition-transform duration-1000 ease-in-out">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className={`w-full ${
                index === currentIndex ? "block" : "hidden"
              }`}
            >
              <TestimonialCard testimonial={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Prev/Next Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full"
        onClick={handlePrev}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full"
        onClick={handleNext}
      >
        &gt;
      </button>

      {/* Pagination */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
