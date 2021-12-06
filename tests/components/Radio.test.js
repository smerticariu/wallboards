import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import Radio from '../../src/components/radio/radio';

Enzyme.configure({ adapter: new Adapter() });

describe('Radio btn', () => {
  test('Radio btn should be rendered', () => {
    const handleClick = jest.fn();
    let wrapper = mount(<Radio label='Test' onChange={handleClick} />);

    expect(wrapper.find('.c-radio').length).toBe(1);
  });

  test('Radio btn onChange callback', () => {
    const handleClick = jest.fn();
    let wrapper = mount(<Radio label='Test' onChange={handleClick} />);
    expect(handleClick.mock.calls.length).toBe(0);
    wrapper.find('input').simulate('change', { target: { checked: true } });
    wrapper.find('input').simulate('click');
    expect(handleClick.mock.calls.length).toBe(1);
  });
});
