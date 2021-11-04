import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import LandingSidebar from './sidebar/landing.sidebar';
import LandingTable from './table/landing.table';
import Toolbar from '../toolbar/toolbar';
import useOnClickOutside from 'src/common/hooks/useOnClickOutside';

const Landing = () => {
  const [isSidebarOpen, handleIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  useOnClickOutside(sidebarRef, () => handleIsSidebarOpen(false));
  const { userInfo } = useSelector((state) => state.login);
  const userPermission = userInfo?.permissionLevel;

  if(userPermission === "BASIC") {
    return <div>Access Denied!</div>
  }

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
