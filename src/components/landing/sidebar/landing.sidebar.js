import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleSelectedWallboardCategoryAC } from '../../../store/actions/wallboards.action';
import { LANDING_DEFAULTS } from '../landing.defaults';

const LandingSidebar = () => {
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
    <div className="c-landing-sidebar">
      {LANDING_DEFAULTS.map((categories, index) => {
        return (
          <div key={index} className="c-landing-sidebar">
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
  );
};

export default LandingSidebar;
