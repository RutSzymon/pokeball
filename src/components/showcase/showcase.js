import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import './showcase.scss';
import Pokeball from './pokeball.png';

const Showcase = ({ handlePrevNext, pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState();

  useEffect(() => {
    if (pokemon) {
      axios.get(pokemon.url)
        .then((response) => {
          const { id, name, sprites: { other: { home: { front_default: image } } } } = response.data;
          setPokemonDetails({ id, name, image });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [pokemon]);

  if (!pokemonDetails) { return null; }

  return (
    <div id='showcase'>
      <h1>{ `#${pokemonDetails.id} ${pokemonDetails.name}` }</h1>
      <div className='slider'>
        <button
          aria-label='Prev'
          type='button'
          className='arrow-btn arrow-left'
          onClick={ () => handlePrevNext(pokemon, -1) }
        />
        <img src={ pokemonDetails.image || Pokeball } alt={ pokemonDetails.name } />
        <button
          aria-label='Next'
          type='button'
          className='arrow-btn arrow-right'
          onClick={ () => handlePrevNext(pokemon, +1) }
        />
      </div>
    </div>
  );
};

Showcase.defaultProps = {
  pokemon: undefined,
};

Showcase.propTypes = {
  handlePrevNext: PropTypes.func.isRequired,
  pokemon: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default Showcase;
