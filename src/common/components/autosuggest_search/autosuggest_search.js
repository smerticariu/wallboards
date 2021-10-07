const autosuggestSearch = () => {
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  
  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
  
    if (escapedValue === "") {
      return [];
    }
  
    const regex = new RegExp("^" + escapedValue, "i");
  
    return languages.filter((language) => regex.test(language.name));
  }
  
  function getSuggestionValue(suggestion) {
    return suggestion.name;
  }
  
  function renderSuggestion(suggestion, { query }) {
    const matches = AutosuggestHighlightMatch(suggestion.name, query);
    const parts = AutosuggestHighlightParse(suggestion.name, matches);
  
    return (
      <span>
        {parts.map((part, index) => {
          const className = part.highlight
            ? "react-autosuggest__suggestion-match"
            : null;
  
          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
    );
  }
}