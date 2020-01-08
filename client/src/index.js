import React from 'react';
import ReactDOM from "react-dom";
import { Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//reduxThunk basically allow redux to do async await through the action creator 
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);


ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>, 
    document.querySelector('#root')
);