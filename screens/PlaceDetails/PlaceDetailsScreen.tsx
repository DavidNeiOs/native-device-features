import React from 'react';
import { View, Text } from 'react-native';
import { PlacesNavProps } from '../../navigation/PlacesNavigator';

interface PlaceDetailsScreenProps
  extends PlacesNavProps<'PlaceDetailsScreen'> {}

export const PlaceDetailsScreen: React.FC<PlaceDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  return (
    <View>
      <Text>Place details screen</Text>
    </View>
  );
};
