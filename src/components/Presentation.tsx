import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Brain, ShieldCheck, Baby, Utensils, Heart, Camera } from 'lucide-react';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "MomBaby Care",
      subtitle: "Smart Diet Tracking System",
      content: "Empowering mothers and caregivers with AI-powered nutrition guidance",
      image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      icon: Heart
    },
    {
      title: "AI-Powered Diet Tracking",
      subtitle: "Intelligent Nutrition Management",
      content: "Personalized recommendations based on pregnancy stage and individual needs using advanced machine learning algorithms",
      icon: Brain,
      features: [
        "Real-time nutritional analysis",
        "Personalized meal recommendations",
        "Smart food safety alerts",
        "Pregnancy-stage specific guidance"
      ]
    },
    {
      title: "Smart Barcode Scanner",
      subtitle: "Instant Food Safety Check",
      content: "Scan product barcodes to instantly verify food safety and get detailed nutritional information",
      icon: Camera,
      features: [
        "Real-time barcode scanning",
        "Instant nutritional information",
        "Pregnancy safety verification",
        "Allergen detection"
      ]
    },
    {
      title: "Comprehensive Baby Progress",
      subtitle: "Growth Monitoring",
      content: "Track and visualize your baby's growth with AI-powered predictions and milestone tracking",
      icon: Baby,
      features: [
        "Growth chart visualization",
        "Milestone tracking",
        "Development predictions",
        "Health insights"
      ]
    },
    {
      title: "Smart Meal Planning",
      subtitle: "Nutritional Excellence",
      content: "AI-driven meal planning system that ensures optimal nutrition for both mother and baby",
      icon: Utensils,
      features: [
        "Weekly meal planning",
        "Nutritional balance optimization",
        "Dietary restriction management",
        "Smart recipe suggestions"
      ]
    },
    {
      title: "Food Safety First",
      subtitle: "Comprehensive Protection",
      content: "Advanced safety checks and real-time alerts to ensure the wellbeing of mother and baby",
      icon: ShieldCheck,
      features: [
        "Allergen detection",
        "Safety recommendations",
        "Ingredient analysis",
        "Contamination alerts"
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Slide Content */}
          <div className="p-8 md:p-12">
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <div className="text-sm text-purple-600">
                Slide {currentSlide + 1} of {slides.length}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <CurrentIcon className="h-16 w-16 text-purple-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {slides[currentSlide].title}
              </h2>
              <p className="text-xl text-purple-600">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            {slides[currentSlide].image ? (
              <div className="relative h-64 rounded-lg overflow-hidden mb-8">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}

            <p className="text-xl text-gray-700 text-center mb-8">
              {slides[currentSlide].content}
            </p>

            {slides[currentSlide].features && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {slides[currentSlide].features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-purple-50 rounded-lg"
                  >
                    <div className="h-2 w-2 bg-purple-600 rounded-full mr-3"></div>
                    <span className="text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-purple-600 transition-all duration-500"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-purple-600 w-6' : 'bg-purple-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Presentation;