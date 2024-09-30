import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import uk from '../Images/uk.webp';
import usa from '../Images/usa.webp';
import aus from '../Images/aus.webp';
import canada from '../Images/canada.webp';
import ire from '../Images/ire.webp';
import nz from '../Images/nz.webp';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Install react-icons for the arrows

function CountriesSection() {
  const countries = [
    { name: 'UK', imageUrl: uk },
    { name: 'Canada', imageUrl: canada },
    { name: 'USA', imageUrl: usa },
    { name: 'New Zealand', imageUrl: nz },
    { name: 'Australia', imageUrl: aus },
    { name: 'Ireland', imageUrl: ire },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % countries.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [countries.length]);

  const displayedCountries = [
    ...countries.slice(currentIndex, currentIndex + 4),
    ...countries.slice(0, Math.max(0, currentIndex + 4 - countries.length)),
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % countries.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + countries.length) % countries.length);
  };

  return (
    <div className="bg-blue-100 py-10 relative">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Explore & Choose From</h2>
        <p className="text-xl mb-8">World Top Universities and Colleges</p>
      </div>
      <div className="flex justify-center items-center relative">
        {/* Arrow positioning */}
        <button
          onClick={prevSlide}
          className="absolute left-4 z-10 p-2"
        >
          <FaChevronLeft className="text-2xl text-orange-500 hover:text-orange-600 transition duration-300" />
        </button>

        {/* Increased space between the cards and increased width */}
        <div className="flex justify-center space-x-8 overflow-hidden">
          {displayedCountries.map((country, index) => (
            <motion.div
              key={index}
              className="relative w-80 h-96 bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)" }}
            >
              <img
                src={country.imageUrl}
                alt={country.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-orange-400 text-white text-center py-2">
                <h3 className="text-lg font-bold">Study in {country.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Arrow positioning */}
        <button
          onClick={nextSlide}
          className="absolute right-4 z-10 p-2"
        >
          <FaChevronRight className="text-2xl text-orange-500 hover:text-orange-600 transition duration-300" />
        </button>
      </div>
    </div>
  );
}

export default CountriesSection;
