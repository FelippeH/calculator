import React from 'react';
import ReactDOM from 'react-dom/client';
import Calc from './calc';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Calc />
  </React.StrictMode>
);
