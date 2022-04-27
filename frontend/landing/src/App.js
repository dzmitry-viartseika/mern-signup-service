import React from 'react';
import TheHeader from './components/Header/TheHeader';
import TheFooter from './components/Footer/TheFooter';
import './assets/scss/style.scss';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
        <div className='landing'>
            <TheHeader />
            <div className='landing-content'>
                Content
            </div>
            <TheFooter />
        </div>
    </BrowserRouter>
  )
}

export default App;
