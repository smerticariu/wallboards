import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import LandingSidebar from 'components/landing/sidebar/landing.sidebar';

Enzyme.configure({ adapter: new Adapter() });

describe('Landing Sidebar Load', () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store;
  store = mockStore(initialState);

  test('Sign In button should be rendered', () => {
    let landingSidebar = mount(
      <Provider store={store}>
        <LandingSidebar />
      </Provider>,
    );

    expect(landingSidebar.find('.c-landing-sidebar').find('.c-landing-sidebar-list').find('.c-landing-sidebar-list__filter').length).toBe(
      2,
    );
  });
});
