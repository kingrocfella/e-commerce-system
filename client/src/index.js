import React from 'react';
import ReactDOM from 'react-dom';
import 'react-widgets/dist/css/react-widgets.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import persistState from './store/persistState'
import fetchState from './store/getState'

//fetchState hydrates the redux store
const store = createStore(rootReducer, fetchState);

store.subscribe(() => {
  //this is just a function that saves state to localStorage
  persistState(store.getState());
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
