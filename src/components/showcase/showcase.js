import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

const Showcase = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState();

  useEffect(() => {
    if (pokemon) {
      axios.get(pokemon.url)
        .then((response) => {
          const { id, name, sprites: { front_default: image } } = response.data;
          setPokemonDetails({ id, name, image });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [pokemon]);

  if (!pokemonDetails) { return null; }

  return (
    <>
      <h1>{ `#${pokemonDetails.id}` }</h1>
      <h2>{ pokemonDetails.name }</h2>
      <img src={ pokemonDetails.image } alt={ pokemonDetails.name } />
    </>
  );
};

Showcase.defaultProps = {
  pokemon: undefined,
};

Showcase.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default Showcase;
