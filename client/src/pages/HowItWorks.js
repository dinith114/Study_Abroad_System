import React from 'react';

// Import your images
import searchImg from '../Images/search.webp';  // Replace with actual paths to your images
import universityImg from '../Images/university.webp';
import planeImg from '../Images/plane.webp';

function HowItWorks() {
  const steps = [
    {
      step: 'Find the Right Course',
      description: 'Explore the best universities for your desired course across the world.',
      imgSrc: searchImg,
    },
    {
      step: 'Submit Your Application',
      description: 'Fill out your application easily and track it online in real-time.',
      imgSrc: universityImg,
    },
    {
      step: 'Get Your Acceptance & Apply for VISA',
      description: 'Receive your acceptance letter and start your visa process seamlessly.',
      imgSrc: planeImg,
    },
  ];

  return (
    <div className="py-16 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-16 text-grNavTextHov">How Global Reach Works</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-28 relative">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg max-w-xs transition-transform transform hover:-translate-y-3 relative min-h-[300px]"  // Set minimum height
          >
            <div className="mb-4">
              <img 
                src={step.imgSrc} 
                alt={step.step} 
                className="w-36 h-36 mx-auto mb-4 rounded-full object-cover" 
              />
            </div>
            <h3 className="text-xl font-semibold text-grNavTextHov mb-4">{step.step}</h3>
            <p className="text-gray-500">{step.description}</p>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 right-[-70px] transform translate-y-[-50%]">
                {/* SVG or Tailwind arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-10 h-10 text-blue-500 rotate-90 md:rotate-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;
