import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import { PlacesNavigator } from './navigation/PlacesNavigator';
import { init } from './helpers/db';

init()
  .then(() => {
    console.log('Initialize db');
  })
  .catch((error) => {
    console.log('Initialize failed', error);
  });

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
