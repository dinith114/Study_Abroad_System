import React from 'react';
import banner from "../Images/service.jpg"; // Import the image

function ServicesBanner() {
  return (
    <div 
      className="relative h-96 bg-cover bg-center" 
      style={{ backgroundImage: `url(${banner})` }}  // Use the imported banner variable
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Text Content aligned to the left center */}
      <div className="absolute left-10 top-1/2 transform -translate-y-1/2 flex flex-col">
        <h1 className="text-white text-4xl font-bold">Education Loan</h1>
        <div className="w-12 h-1 bg-red-600 mt-4"></div>
      </div>

      {/* Button */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
        <button className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-yellow-500 transition duration-300">
          Calculator
        </button>
      </div>
    </div>
  );
}

export default ServicesBanner;
