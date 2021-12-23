import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LandingSidebar from './sidebar/landing.sidebar';
import LandingTable from './table/landing.table';
import Toolbar from '../toolbar/toolbar';
import useOnClickOutside from '../../common/hooks/useOnClickOutside';
import { DEFAULTS } from '../../common/defaults/defaults';
import useWindowSize from '../../common/hooks/useWindowSize';
import { fixLandingScrollBar } from '../../common/utils/fixLandingScrollbar';
import { resetLandingPageFiltersAC } from '../../store/actions/wallboards.action';

const Landing = () => {
  const [isSidebarOpen, handleIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const dispatch = useDispatch();
  useOnClickOutside(sidebarRef, () => handleIsSidebarOpen(false));
  const { userInfo } = useSelector((state) => state.login);
  const adminPermissions = userInfo.isAdmin;
  const teamleaderPermissions = userInfo.isTeamLeader;
  useEffect(() => {
    dispatch(resetLandingPageFiltersAC());
    // eslint-disable-next-line
  }, []);
  const { width } = useWindowSize();
  useEffect(() => {
    if (width) {
      fixLandingScrollBar();
    }
  }, [width]);
  if (!adminPermissions || teamleaderPermissions) {
    return (
      <Toolbar template={DEFAULTS.TOOLBAR.NAME.ERROR}>
        <div className="error-message-container">
          <h3 className="error-message--headline">Error 401:</h3>
          <p className="error-message">Access Denied!</p>
        </div>
      </Toolbar>
    );
  }

  return (
    <div className="c-landing">
      <Toolbar template={DEFAULTS.TOOLBAR.NAME.LANDING} />
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
