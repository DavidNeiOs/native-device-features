import React, { useCallback } from 'react';
import { View, Text, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { PlacesNavProps } from '../../navigation/PlacesNavigator';
import { CustomHeaderButton } from '../../components/HeaderButton';
import { useTypedSelector } from '../../store';
import { PlaceItem } from '../../components/PlaceItem';

interface PlaceListScreenProps extends PlacesNavProps<'PlaceListScreen'> {}

export const PlaceListScreen: React.FC<PlaceListScreenProps> = ({
  navigation,
}) => {
  const places = useTypedSelector((state) => state.places.places);

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
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          image=''
          title={itemData.item.title}
          address=''
          onSelect={() =>
            navigation.navigate('PlaceDetailsScreen', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            })
          }
        />
      )}
    />
  );
};
