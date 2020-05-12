import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MapScreen } from '../screens/Map';
import { NewPlaceScreen } from '../screens/NewPlace';
import { PlaceDetailsScreen } from '../screens/PlaceDetails';
import { PaceListScreen } from '../screens/PlaceList';

const Stack = createStackNavigator();

export const PlacesNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='PlaceListScreen' component={PlaceDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
