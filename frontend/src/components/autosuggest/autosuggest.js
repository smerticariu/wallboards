import React from 'react';
import Autosuggest from 'react-autosuggest';
import Highlighter from "react-highlight-words";

import { useState } from 'react';
const CustomAutosuggest = ({ allTitles, value, name, placeholder = '', isSmallSize, onChange, ...props }) => {
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function getSuggestions(value) {
    const escapedValue = value?.value?.length ? escapeRegexCharacters(value.value.trim()) : [];
    if (!escapedValue.length) {
      return [];
    }
    
    return allTitles
      .filter((title) => {
        return title?.toLowerCase().includes(escapedValue.toLowerCase());
      })
      .slice(0, 8); // show only first 8 suggestions
  }

  function getSuggestionValue(suggestion) {
    return suggestion;
  }

  function renderSuggestion(suggestion, query) {  
    return (
      <Highlighter
        highlightClassName="react-autosuggest__suggestion-match"
        searchWords={[query.query.toLowerCase()]}
        autoEscape={true}
        textToHighlight={suggestion}
      />
    );
  }

  const onChangeInput = (event, { newValue, method }) => {
    onChange(newValue, name);
  };

  const onSuggestionsFetchRequested = (value) => {
    setSearchSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = (value) => {
    setSearchSuggestions(getSuggestions(value));
  };

  const inputProps = {
    placeholder: placeholder,
    value: value,
    onChange: onChangeInput,
    name,
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
