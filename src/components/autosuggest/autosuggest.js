import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { useState } from 'react';
const CustomAutosuggest = ({ allTitles, value, name, placeholder = '', isSmallSize, onChange, ...props }) => {
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function getSuggestions(value) {
    const escapedValue = value.length > 0 ? escapeRegexCharacters(value.trim()) : [];

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return allTitles.filter((title) => regex.test(title));
  }

  function getSuggestionValue(suggestion) {
    return suggestion;
  }

  function renderSuggestion(suggestion, query) {
    const matches = match(suggestion, query.query);

    const parts = parse(suggestion, matches);

    return (
      <span>
        {parts.map((part, index) => {
          const className = part.highlight ? 'react-autosuggest__suggestion-match' : null;

          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
    );
  }

  const onChangeInput = (event, { newValue, method }) => {
    onChange(newValue, name);
  };

  const onSuggestionsFetchRequested = (value) => {
    setSearchSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSearchSuggestions(getSuggestions([]));
  };

  const inputProps = {
    placeholder: placeholder,
    value: value,
    onChange: onChangeInput,
    name: 'skill',
  };

  return (
    <Autosuggest
      suggestions={searchSuggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      containerProps={{ className: `react-autosuggest__container ${isSmallSize ? 'react-autosuggest__container--small' : ''}` }}
    />
  );
};

export default CustomAutosuggest;
