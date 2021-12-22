import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Login from 'components/login/login';

Enzyme.configure({ adapter: new Adapter() });

describe('Loading Login Page', () => {
  test('Sign In button should be rendered', () => {
      let login = mount(<Login />);

      expect(login.find('.c-login-start__btn')).not.toHaveLength(0);
  })
})