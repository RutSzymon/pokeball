import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

import './search-box.scss';

const SearchBox = ({ pokemonList, setChosenPokemon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const caseInsensitiveRegex = value => new RegExp(`${value}`, 'i');
  const escapeRegexCharacters = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const searchPokemon = () => {
    const escapedValue = escapeRegexCharacters(searchTerm.trim());
    if (escapedValue === '') { return []; }

    const regex = caseInsensitiveRegex(escapedValue);
    return pokemonList.filter(pokemon => regex.test(pokemon.name)).slice(0, 5);
  };

  const onSuggestionSelected = (_event, { suggestion }) => {
    setChosenPokemon(suggestion);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(searchPokemon(value));
  };

  const getSuggestionValue = suggestion => suggestion.name;

  const renderSuggestion = suggestion => <div>{ suggestion.name }</div>;

  const handleChange = (_event, { newValue }) => {
    setSearchTerm(newValue);
  };

  const inputProps = {
    placeholder: 'Which pokemon would you like to choose?',
    value: searchTerm,
    onChange: handleChange,
  };

  return (
    <Autosuggest
      suggestions={ suggestions }
      onSuggestionSelected={ onSuggestionSelected }
      onSuggestionsClearRequested={ onSuggestionsClearRequested }
      onSuggestionsFetchRequested={ onSuggestionsFetchRequested }
      getSuggestionValue={ getSuggestionValue }
      renderSuggestion={ renderSuggestion }
      inputProps={ inputProps }
    />
  );
};

SearchBox.propTypes = {
  pokemonList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
  setChosenPokemon: PropTypes.func.isRequired,
};

export default SearchBox;
