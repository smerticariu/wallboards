import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import WallboardComponents from '../../src/components/wallboard/wallboard-components';

const mockStore = createMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Wallboard Components', () => {
  test('Wallboard Components should be rendered', () => {
    const store = mockStore({});
    let wrapper = mount(
      <Provider store={store}>
        <WallboardComponents />
      </Provider>,
    );

    expect(wrapper.find('.c-panel').length).toBe(1);
  });
});
