import React from 'react';
import { Outlet } from 'react-router-dom';

const AppContainer = () => (
  <div className='app-container'>
    AppContainer
    <Outlet />
  </div>
);

export default AppContainer;
