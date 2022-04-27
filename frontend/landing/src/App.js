import React from 'react';
import TheHeader from './components/Header/TheHeader';
import './assets/scss/style.scss';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
        <div>
            <TheHeader />
        </div>
    </BrowserRouter>
  )
}

export default App;
