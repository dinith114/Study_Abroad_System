import React from 'react';
import ImageSlider from './ImageSlider';
import WhatWeDo from './WhatWeDo';
import CountriesSection from './CountriesSection';
// import UniversitySearch from './UniversitySearch';
import HowItWorks from './HowItWorks';
// import ReservationForm from './ReservationForm';
import SuccessStatus from './SuccessStatus';

function Home2() {
  return (
    <div>
      <ImageSlider />
      <WhatWeDo />
      <CountriesSection />
      {/* <UniversitySearch /> */}
      <HowItWorks />
      {/* <ReservationForm /> */}
      <SuccessStatus />
    </div>
  );
}

export default Home2;
