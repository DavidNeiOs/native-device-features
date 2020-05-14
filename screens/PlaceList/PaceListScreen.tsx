import React, { useCallback } from 'react';
import { View, Text, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { PlacesNavProps } from '../../navigation/PlacesNavigator';
import { CustomHeaderButton } from '../../components/HeaderButton';

interface PlaceListScreenProps extends PlacesNavProps<'PlaceListScreen'> {}

export const PlaceListScreen: React.FC<PlaceListScreenProps> = ({
  navigation,
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Save'
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => navigation.navigate('NewPlaceScreen')}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>Place List</Text>
    </View>
  );
};
