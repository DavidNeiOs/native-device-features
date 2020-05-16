import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import { PlacesNavigator } from './navigation/PlacesNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
