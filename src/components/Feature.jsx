import React from 'react';

// Define mock data for the feature cards (now 4 items)
const features = [
  {
    title: "Building Brighter Futures",
    subtitle: "Capacity Building for Tomorrows Leaders",
    // Placeholder image URL
    image: "https://social-activity.cmsmasters.studio/wp-content/uploads/2014/08/impact-11.jpg",
  },
  {
    title: "From Skills to Success",
    subtitle: "Empowering Youths for Economic Growth",
    image: "https://social-activity.cmsmasters.studio/wp-content/uploads/2014/08/Democracy-11.jpg",
  },
  {
    title: "Empowerment Through Entrepreneurship",
    subtitle: "Growing Micro-Entrepreneurs",
    image: "https://esdo.net.bd/wp-content/uploads/2025/11/4-1170x725.jpg",
  },
  {
    title: "Infrastructure for Impact",
    subtitle: "Laying Foundations for Community Resilience",
    image: "https://social-activity.cmsmasters.studio/wp-content/uploads/2014/08/Enthusiasm1.jpg",
  },
];

const FeatureCard = ({ feature }) => {
  return (
    // Card Container: 'group' class enables tracking hover state for children
    <div
      className="group relative w-full h-[500px] cursor-pointer overflow-hidden shadow-2xl transition-all duration-500 ease-in-out flex-shrink-0 md:h-[600px]"
      // Use flex-basis of 25% for four cards to ensure equal width distribution on desktop
      style={{ flexBasis: '25%' }}
    >
      {/* Background Image Area */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out group-hover:scale-105"
        style={{ backgroundImage: `url(${feature.image})` }}
      />

      {/* Primary Dark Gradient Overlay - The key to the animation */}
      {/* On hover, the height shrinks from 75% to 40% and opacity reduces */}
      <div
        className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-black/90 to-black/10 transition-all duration-700 ease-in-out group-hover:h-[40%] group-hover:from-black/70"
      />

      {/* Content Area (Title and Subtitle) */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-20">
        {/* Title: Subtle change in size/margin on hover */}
        <h2 className="text-3xl font-extrabold mb-2 leading-tight transition-all duration-500 ease-in-out group-hover:text-4xl group-hover:mb-3">
          {feature.title}
        </h2>
        {/* Subtitle: Fades to full opacity on hover */}
        <p className="text-base font-medium transition-all duration-500 ease-in-out opacity-90 group-hover:opacity-100">
          {feature.subtitle}
        </p>
      </div>
    </div>
  );
};

const Feature = () => {
  return (
    <div className=" bg-gray-100 flex items-center justify-center p-4 font-['Inter'] max-w-7xl mx-auto">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center">
          Our Impact Areas
        </h1>
        
        {/* Features Container: Stacks vertically on mobile, spreads horizontally on desktop, no gap now */}
        <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[700px] overflow-hidden rounded-xl gap-2">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;