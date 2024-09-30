import React from 'react';
import image1 from '../Images/application.webp';
import image2 from '../Images/course.webp';
import image3 from '../Images/loan.webp';
import image4 from '../Images/counselling.webp';

function WhatWeDo() {
  return (
    <div className="py-16 px-4 bg-gray-100 text-center">
      <h2 className="text-grNavTextHov text-3xl font-bold mb-12">We are there with you at every step</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-grNavTextHov text-white rounded-lg shadow-md overflow-hidden">
          <img src={image4} alt="Counseling" className="w-full object-cover h-48" />
          <div className="p-6 text-left">
            <h3 className="text-xl font-semibold mb-4">An all-inclusive counselling</h3>
            <p className="text-gray-300">Certified and experienced counsellors of Global Reach will make the study abroad journey hassle-free.</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-red-500 text-white rounded-lg shadow-md overflow-hidden">
          <img src={image1} alt="Application Processing" className="w-full object-cover h-48" />
          <div className="p-6 text-left">
            <h3 className="text-xl font-semibold mb-4">Application Processing</h3>
            <p>Application processing is a manageable task when you have Global Reach experts to guide you.</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-grNavTextHov text-white rounded-lg shadow-md overflow-hidden">
          <img src={image2} alt="Course Selection Advice" className="w-full object-cover h-48" />
          <div className="p-6 text-left">
            <h3 className="text-xl font-semibold mb-4">Course Selection Advice</h3>
            <p className="text-gray-300">Proper guidance and assistance in choosing the appropriate course program by experts.</p>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-red-500 text-white rounded-lg shadow-md overflow-hidden">
          <img src={image3} alt="Loan Assistance" className="w-full object-cover h-48" />
          <div className="p-6 text-left">
            <h3 className="text-xl font-semibold mb-4">Loan Assistance</h3>
            <p className="text-gray-300">Expert guidance on visa procedures and documentation to ensure a smooth transition abroad.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatWeDo;
