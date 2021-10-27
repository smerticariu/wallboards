import React, { useRef, useState } from 'react';

import LandingSidebar from './sidebar/landing.sidebar';
import LandingTable from './table/landing.table';
import Toolbar from '../toolbar/toolbar';
import useOnClickOutside from 'src/common/hooks/useOnClickOutside';

const Landing = () => {
  const [isSidebarOpen, handleIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  useOnClickOutside(sidebarRef, () => handleIsSidebarOpen(false));
  return (
    <div className="c-landing">
      <Toolbar template="landing" />
      <div className="c-landing__content">
        <LandingSidebar ref={sidebarRef} handleIsSidebarOpen={handleIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
        <LandingTable />
        {!isSidebarOpen && (
          <div onClick={() => handleIsSidebarOpen(true)} className="burger">
            <div className="burger-lines" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
