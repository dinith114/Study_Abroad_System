import React from "react";
import HeroImage from '../Images/heroImage.webp'

function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-100">
        <img
          src={HeroImage} // replace with your actual image path
          alt="Hero"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">
            Your preferred Overseas Education advisor
          </h1>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="bg-gray-100 rounded-md p-4 shadow-md">
            <ul className="flex justify-center space-x-8 mb-4">
              <li className="text-blue-500 font-semibold">Courses</li>
              <li className="text-gray-600">Scholarships</li>
              <li className="text-gray-600">Universities</li>
              <li className="text-gray-600">Events</li>
            </ul>
            <div className="flex space-x-4 justify-center">
              <input
                type="text"
                placeholder="Enter subject here"
                className="border rounded px-4 py-2 w-1/4"
              />
              <input
                type="text"
                placeholder="Enter study level here"
                className="border rounded px-4 py-2 w-1/4"
              />
              <input
                type="text"
                placeholder="Enter destination"
                className="border rounded px-4 py-2 w-1/4"
              />
              <button className="bg-blue-500 text-white rounded px-6 py-2">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">
            Interested in studying abroad with Global Reach?
          </h2>
          <p className="text-gray-600">
            Fill in your details and we'll call you back!
          </p>
        </div>
        <div className="container mx-auto px-4">
          <form className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Enter your name"
              className="border rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="Enter Age"
              className="border rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="Enter Mobile"
              className="border rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="Enter Email"
              className="border rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="Highest qualification"
              className="border rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="Preferred destination"
              className="border rounded px-4 py-2"
            />
            <div className="col-span-2 text-center">
              <button className="bg-blue-500 text-white rounded px-8 py-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-blue-500 py-6">
        <div className="text-center text-white">
          <h3 className="text-xl font-semibold">Know more about our services</h3>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="bg-white text-blue-500 rounded px-4 py-2">
              Make an Appointment
            </button>
            <button className="border border-white text-white rounded px-4 py-2">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
