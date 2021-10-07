import React from 'react';

import LandingSidebar from './sidebar/landing.sidebar';
import LandingTable from './table/landing.table';
import Toolbar from '../toolbar/toolbar';

const Landing = ({ userInfo }) => {
  return (
    <div className="c-landing">
      <Toolbar template="landing" />
      <div className="c-landing__content">
        <LandingSidebar />
        <LandingTable userInfo={userInfo} />
      </div>
    </div>
  );
};

export default Landing;
