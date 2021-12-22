import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import CheckBox from '../../src/components/checkbox/checkbox';

Enzyme.configure({ adapter: new Adapter() });

describe('Checkbox', () => {
  test('Checkbox should be rendered', () => {
    const handleClick = jest.fn();
    let wrapper = mount(<CheckBox label='Test' onChange={handleClick} />);

    expect(wrapper.find('.c-checkbox').length).toBe(1);
  });

  test('Checkbox onChange callback', () => {
    const handleClick = jest.fn();
    let wrapper = mount(<CheckBox label='Test' onChange={handleClick} />);
    expect(handleClick.mock.calls.length).toBe(0);
    wrapper.find('input').simulate('change', { target: { checked: true } });
    wrapper.find('input').simulate('click');
    expect(handleClick.mock.calls.length).toBe(1);
  });

  test('Checkbox shuld be grey', () => {
    const handleClick = jest.fn();
    let wrapper = mount(<CheckBox label='Test' isGrey onChange={handleClick} />);

    const checkbox = wrapper.find('.c-checkbox--grey__checkmark');

    expect(checkbox.length).toBe(1);
  });
});
