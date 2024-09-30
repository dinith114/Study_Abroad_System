import React from 'react';
import { FaUniversity, FaGlobeAmericas, FaUserGraduate } from 'react-icons/fa';

function SuccessStatus() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        
        {/* First Stat */}
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl">
          <FaUniversity className="text-5xl text-orange-500 mb-4 transition-transform duration-300 hover:rotate-12" />
          <h3 className="text-5xl font-extrabold text-gray-800">500+</h3>
          <p className="text-xl font-semibold text-gray-600">Institutions</p>
        </div>

        {/* Second Stat */}
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl">
          <FaGlobeAmericas className="text-5xl text-red-500 mb-4 transition-transform duration-300 hover:rotate-12" />
          <h3 className="text-5xl font-extrabold text-gray-800">100%</h3>
          <p className="text-xl font-semibold text-gray-600">Nearly Visa Success Rate</p>
        </div>

        {/* Third Stat */}
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl">
          <FaUserGraduate className="text-5xl text-blue-500 mb-4 transition-transform duration-300 hover:rotate-12" />
          <h3 className="text-5xl font-extrabold text-gray-800">5000+</h3>
          <p className="text-xl font-semibold text-gray-600">Enrolled Students</p>
        </div>
      </div>
    </div>
  );
}

export default SuccessStatus;
