import React from 'react';
import {render} from 'react-dom';
import App from './components/app/app';
import { HelmetProvider } from 'react-helmet-async';
import './index.scss';

render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
