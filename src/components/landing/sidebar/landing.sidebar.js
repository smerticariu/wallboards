import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleSelectedWallboardCategoryAC } from '../../../store/actions/wallboards.action';
import { LANDING_DEFAULTS } from '../landing.defaults';

const LandingSidebar = forwardRef(({ isSidebarOpen, handleIsSidebarOpen, ...props }, ref) => {
  const dispatch = useDispatch();
  const handleClick = (e, category) => {
    const selectedElement = document.querySelector('.c-landing-sidebar-list__filter--selected');
    if (selectedElement) selectedElement.classList.remove('c-landing-sidebar-list__filter--selected');

    e.target.classList.add('c-landing-sidebar-list__filter--selected');
    dispatch(handleSelectedWallboardCategoryAC(category));
  };

  useEffect(() => {
    const firstElement = document.querySelector('.c-landing-sidebar-list__filter');
    if (firstElement) firstElement.classList.add('c-landing-sidebar-list__filter--selected');
  }, []);

  return (
    <div ref={ref} className={`c-landing-sidebar ${isSidebarOpen ? 'c-landing-sidebar--open' : ''}`}>
      <div className="c-landing-sidebar-relative">
        {isSidebarOpen && (
          <div onClick={() => handleIsSidebarOpen(false)} className="burger burger--active">
            <div className="burger-lines" />
          </div>
        )}

        {LANDING_DEFAULTS.map((categories, index) => {
          return (
            <div key={index} className="c-landing-sidebar-item">
              <ul className="c-landing-sidebar-list">
                <li className="c-landing-sidebar-list__headline">{categories.NAME}.</li>
                {categories.ELEMENTS.map((category, index) => {
                  return (
                    <li key={index} className="c-landing-sidebar-list__filter" onClick={(e) => handleClick(e, category)}>
                      {category}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default LandingSidebar;
