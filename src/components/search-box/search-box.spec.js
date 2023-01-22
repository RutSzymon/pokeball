import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';

import SearchBox from './search-box';

describe('SearchBox', () => {
  const pokemonList = [
    { name: 'bulbasaur', url: 'pokemon/1' },
    { name: 'charizard', url: 'pokemon/6' },
    { name: 'pikachu', url: 'pokemon/25' },
  ];
  const setChosenPokemonMock = jest.fn();

  const setup = () => {
    const wrapper = render(<SearchBox pokemonList={ pokemonList } setChosenPokemon={ setChosenPokemonMock } />);
    const searchBox = wrapper.getByPlaceholderText('Choose pokemon');

    return { searchBox, ...wrapper };
  };

  it('renders correctly', () => {
    const { searchBox } = setup();

    expect(searchBox).toBeInTheDocument();
  });

  describe('suggestions on typing', () => {
    it('displays suggestions when matches are found', () => {
      const { searchBox, getAllByRole } = setup();
      fireEvent.change(searchBox, { target: { value: 'ch' } });
      act(() => { searchBox.focus(); });

      const suggestions = getAllByRole('option');
      expect(suggestions).toHaveLength(2);
      expect(suggestions.at(0)).toHaveTextContent('charizard');
      expect(suggestions.at(1)).toHaveTextContent('pikachu');
    });

    it('is case insensitive', () => {
      const { searchBox, getAllByRole } = setup();
      fireEvent.change(searchBox, { target: { value: 'CH' } });
      act(() => { searchBox.focus(); });

      const suggestions = getAllByRole('option');
      expect(suggestions).toHaveLength(2);
      expect(suggestions.at(0)).toHaveTextContent('charizard');
      expect(suggestions.at(1)).toHaveTextContent('pikachu');
    });

    it('does not display suggestions when no matches are found', () => {
      const { searchBox, queryAllByRole } = setup();
      fireEvent.change(searchBox, { target: { value: 'abc' } });
      act(() => { searchBox.focus(); });

      const suggestions = queryAllByRole('option');
      expect(suggestions).toHaveLength(0);
    });
  });

  describe('choosing the pokemon', () => {
    it('displays suggestions when matches are found', () => {
      const { searchBox, getByRole } = setup();
      fireEvent.change(searchBox, { target: { value: 'bulb' } });
      act(() => { searchBox.focus(); });

      const suggestion = getByRole('option');
      fireEvent.click(suggestion);
      expect(setChosenPokemonMock).toHaveBeenCalledWith(pokemonList.at(0));
    });
  });
});
