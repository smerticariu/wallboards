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
});
