import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AppContainer from './views/app-container/app-container';
import NoMatch from './views/no-match/no-match';
import PokemonIndex from './views/pokemon-index/pokemon-index';

const App = () => (
  <Routes>
    <Route path='/' element={ <AppContainer /> }>
      <Route index element={ <PokemonIndex /> } />
      <Route path='*' element={ <NoMatch /> } />
    </Route>
  </Routes>
);

export default App;
