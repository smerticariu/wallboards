import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import LandingSidebar from '../../src/components/landing/sidebar/landing.sidebar';
import Landing from '../../src/components/landing/landing';
import { FetchStatus, wallboardGroupInitialValues } from '../../src/store/reducers/wallboards.reducer';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = createMockStore([thunk]);
describe('Landing Sidebar Load', () => {
  const initialState = {
    login: { token: 'dawd', userInfo: { isAdmin: true } },
    wallboards: {
      present: {
        allWallboards: {
          fetchStatus: FetchStatus.NULL,
          wallboards: [],
        },
        activeWallboard: {
          wallboardInitialValues: {},
        },
        wallboardGroup: {
          wallboardGroupInitialValues: { ...wallboardGroupInitialValues },
          wallboardGroup: { ...wallboardGroupInitialValues },
          fetchStatus: FetchStatus.NULL,
          fetchMessage: '',
          saveStatus: FetchStatus.NULL,
          statusCode: '',
        },
      },
    },
    landing: {
      category: '',
      searchedWallboards: [],
      wallboardsByCategory: [],
    },
  };
  const store = mockStore(initialState);

  test('Close burger menu on X click', () => {
    const handleClick = jest.fn();

    let landingSidebar = mount(
      <Provider store={store}>
        <LandingSidebar handleIsSidebarOpen={handleClick} isSidebarOpen={true} />
      </Provider>,
    );

    expect(handleClick.mock.calls.length).toBe(0);
    expect(landingSidebar.find('.burger--active').length).toBe(1);

    landingSidebar.find('.burger--active').simulate('click');
    const isOpen = handleClick.mock.calls[0][0];

    landingSidebar.setProps({ children: <LandingSidebar handleIsSidebarOpen={handleClick} isSidebarOpen={isOpen} /> });

    expect(landingSidebar.find('.burger--active').length).toBe(0);
  });
  test('Open burger menu on ||| click', () => {
    let landing = mount(
      <Provider store={store}>
        <Landing />
      </Provider>,
    );

    expect(landing.find('.burger').length).toBe(1);

    landing.find('.burger').simulate('click');
    expect(landing.find(Landing).prop()).toBe(undefined); // TODO must continue
  });
});
