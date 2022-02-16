import React from 'react';
import { Provider } from 'react-redux'

import store from './store'

// navigation
import MainNavigator from './navigation'

import { init } from './db';

init().then(() => {
    console.log('DB initialized');
}).catch(err => {
    console.log('DB initialization failed', err);
});

export default function App() {
  return (<Provider store={store}><MainNavigator /></Provider>);
}
