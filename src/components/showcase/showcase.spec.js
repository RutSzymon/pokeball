import axios from 'axios';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Showcase from './showcase';

jest.mock('axios');

describe('Showcase', () => {
  const handlePrevNextMock = jest.fn();
  const pokemon = { name: 'bulbasaur', url: 'pokemonDetailsURL' };
  const pokemonDetailsResponse = {
    data: {
      id: 1,
      name: 'bulbasaur',
      sprites: { other: { home: { front_default: 'imageURL' } } },
    },
  };

  const setup = () => {
    const wrapper = render(<Showcase handlePrevNext={ handlePrevNextMock } pokemon={ pokemon } />);

    return wrapper;
  };

  afterEach(() => { jest.clearAllMocks(); });

  it('renders correctly', async () => {
    axios.get.mockResolvedValueOnce(pokemonDetailsResponse);
    const { findByAltText, findByLabelText, findByText } = setup();

    expect(await findByText('#1 bulbasaur')).toBeInTheDocument();
    expect(await findByLabelText('Prev')).toBeInTheDocument();
    expect(await findByAltText('bulbasaur')).toBeInTheDocument();
    expect(await findByLabelText('Next')).toBeInTheDocument();
  });

  it('renders nothing if pokemon\'s details are not fetched', async () => {
    axios.get.mockResolvedValueOnce({ data: {} });
    const { container } = setup();

    expect(container).toBeEmptyDOMElement();
  });

  describe('Prev/Next buttons', () => {
    const clickPrevNextButton = async (buttonType) => {
      axios.get.mockResolvedValueOnce(pokemonDetailsResponse);
      const { findByLabelText } = setup();
      const button = await findByLabelText(buttonType);
      fireEvent.click(button);
    };

    it('calls handlePrevNext function on Prev button click', async () => {
      await clickPrevNextButton('Prev');

      expect(handlePrevNextMock).toBeCalledWith(pokemon, -1);
    });

    it('calls handlePrevNext function on Next button click', async () => {
      await clickPrevNextButton('Next');

      expect(handlePrevNextMock).toBeCalledWith(pokemon, +1);
    });
  });
});
