import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Showcase from '../../components/showcase/showcase';
import SearchBox from '../../components/search-box/search-box';

const PokemonIndex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [chosenPokemon, setChosenPokemon] = useState();

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then(response => {
        setPokemonList(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <SearchBox
        pokemonList={ pokemonList }
        setChosenPokemon={ setChosenPokemon }
      />
      <Showcase />
    </>
  );
};

export default PokemonIndex;
