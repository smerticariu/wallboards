import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import CustomAutosuggest from '../../src/components/autosuggest/autosuggest';

Enzyme.configure({ adapter: new Adapter() });

describe('Autosuggest', () => {
  test('Autosuggest should be rendered', () => {
    let autosuggest = mount(
      <CustomAutosuggest
        name='test'
        onChange={() => {}}
        value={'test'}
        allTitles={['test1', 'test2', 'test3', 'last1']}
        placeholder='Search'
      />,
    );
    expect(autosuggest.find('.react-autosuggest__suggestions-container--open').length).toBe(0);
    autosuggest.find('.react-autosuggest__container').simulate('click');
    expect(autosuggest.find('.react-autosuggest__suggestions-container').length).toBe(1);
  });

  test('3 options must be colored', () => {
    let autosuggest = mount(
      <CustomAutosuggest
        name='test'
        onChange={() => {}}
        value={'test'}
        allTitles={['test1', 'test2', 'test3', 'frtest', 'last1']}
        placeholder='Search'
      />,
    );
    expect(autosuggest.find('.react-autosuggest__suggestions-container--open').length).toBe(0);
    autosuggest.find('input').simulate('focus');
    expect(autosuggest.find('.react-autosuggest__suggestion-match').length).toBe(4);
  });
  test('4 options must be displayed', () => {
    let autosuggest = mount(
      <CustomAutosuggest
        name='test'
        onChange={() => {}}
        value={'test'}
        allTitles={['test1', 'test2', 'test3', 'frtest', 'last1']}
        placeholder='Search'
      />,
    );
    expect(autosuggest.find('.react-autosuggest__suggestions-container--open').length).toBe(0);
    autosuggest.find('input').simulate('focus');
    expect(autosuggest.find('li').length).toBe(4);
  });

  test('change autosuggest value on type', () => {
    const handleChange = jest.fn();
    let autosuggest = mount(
      <CustomAutosuggest
        name='test'
        onChange={handleChange}
        value={'test initial value'}
        allTitles={['test1', 'test2', 'test3', 'test3', 'test5', 'frtest', 'last1']}
        placeholder='Search'
      />,
    );
    expect(autosuggest.find('.react-autosuggest__suggestions-container--open').length).toBe(0);
    expect(handleChange.mock.calls.length).toBe(0);
    autosuggest.find('input').simulate('change', { target: { value: 'test5' } });
    expect(handleChange.mock.calls[0].includes('test5')).toBe(true);
  });
});
