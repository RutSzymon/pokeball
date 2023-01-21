import React from 'react';
import { Outlet } from 'react-router-dom';

import Logo from '../../components/logo/logo';

import './app-container.scss';

const AppContainer = () => (
  <div id='app-container'>
    <Logo />
    <Outlet />
  </div>
);

export default AppContainer;
