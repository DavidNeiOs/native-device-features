import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import { MapScreen } from '../screens/Map';
import { NewPlaceScreen } from '../screens/NewPlace';
import { PlaceDetailsScreen } from '../screens/PlaceDetails';
import { PlaceListScreen } from '../screens/PlaceList';
import colors from '../constants/colors';

export type PlacesParamList = {
  PlaceListScreen: undefined;
  MapScreen: undefined;
  NewPlaceScreen: undefined;
  PlaceDetailsScreen: undefined;
};

export type PlacesNavProps<T extends keyof PlacesParamList> = {
  navigation: StackNavigationProp<PlacesParamList, T>;
  route: RouteProp<PlacesParamList, T>;
};

const Stack = createStackNavigator<PlacesParamList>();

export const PlacesNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='PlaceListScreen'
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? colors.primary : '',
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name='PlaceListScreen'
          component={PlaceListScreen}
          options={{ title: 'All places' }}
        />
        <Stack.Screen
          name='NewPlaceScreen'
          component={NewPlaceScreen}
          options={{ title: 'Add New Place' }}
        />
        <Stack.Screen
          name='PlaceDetailsScreen'
          component={PlaceDetailsScreen}
          options={{ headerTitle: undefined }}
        />
        <Stack.Screen
          name='MapScreen'
          component={MapScreen}
          options={{ headerTitle: undefined }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
