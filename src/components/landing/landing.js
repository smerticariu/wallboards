import React from 'react';
import { useSelector } from 'react-redux';

import LandingSidebar from './sidebar/landing.sidebar';
import LandingTable from './table/landing.table';

const Landing = () => {
  const category = useSelector(state => state.landing);
  console.log('Selected category:', category)
  return (
    <div className="c-landing">
      <LandingSidebar />
      <LandingTable />
    </div>
  );
}

export default Landing;