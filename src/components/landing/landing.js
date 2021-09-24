import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LandingSidebar from './sidebar/landing.sidebar';

const Landing = () => {
  const category = useSelector(state => state.landing);
  console.log('Selected category:', category)
  return (
    <div className="c-landing">
      <LandingSidebar />
    </div>
  );
}

export default Landing;