import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const SearchBox = ({ pokemonList, setChosenPokemon }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const caseInsensitiveRegex = value => new RegExp(`${value}`, 'i');
  const escapeRegexCharacters = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  useEffect(() => {
    const searchPokemon = () => {
      const escapedValue = escapeRegexCharacters(searchTerm.trim());
      if (escapedValue === '') { return []; }

      const regex = caseInsensitiveRegex(escapedValue);
      return pokemonList.filter(pokemon => regex.test(pokemon.name));
    };

    const delayDebounceFn = setTimeout(() => {
      console.log(searchPokemon());
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <input
      type='text'
      autoComplete='off'
      placeholder='Search here...'
      onChange={ e => setSearchTerm(e.target.value) }
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
