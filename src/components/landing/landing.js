import React from 'react';
import { useSelector } from 'react-redux';

import LandingSidebar from './sidebar/landing.sidebar';
import LandingTable from './table/landing.table';
import Toolbar from '../toolbar/toolbar';

const Landing = () => {
  const category = useSelector(state => state.landing);
  console.log('Selected category:', category)
  return (
    <div className="c-landing">
      <Toolbar template="landing" />
      <div className="c-landing__content">
        <LandingSidebar />
        <LandingTable />
      </div>
    </div>
  );
}

export default Landing;