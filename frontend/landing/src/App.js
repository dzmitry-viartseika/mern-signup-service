import React from 'react';
import TheHeader from './components/Header/TheHeader';
import TheFooter from './components/Footer/TheFooter';
import WhatCompany from './components/WhatCompany/WhatCompany';
import './assets/scss/style.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// rootReducer,
const store = createStore(
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
    )
);

export const App = () => {
  return (
    <BrowserRouter>
        <div className='landing'>
            <Provider store={store}>
                <TheHeader />
                <div className='landing-content'>
                    Content
                    <WhatCompany />
                </div>
                <TheFooter />
            </Provider>
        </div>
    </BrowserRouter>
  )
}

export default App;
