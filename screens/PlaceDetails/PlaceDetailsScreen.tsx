import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';

import { PlacesNavProps } from '../../navigation/PlacesNavigator';
import { MapPreview } from '../../components/MapPreview';
import { useTypedSelector } from '../../store';
import colors from '../../constants/colors';

interface PlaceDetailsScreenProps
  extends PlacesNavProps<'PlaceDetailsScreen'> {}

export const PlaceDetailsScreen: React.FC<PlaceDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const placeId = route.params.placeId;
  const selectedPlace = useTypedSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );
  if (selectedPlace) {
    const selectedLocation = {
      latitude: selectedPlace.lat,
      longitude: selectedPlace.lng,
    };
    const showMapHandler = () => {
      navigation.navigate('MapScreen', {
        readOnly: true,
        initialLocation: selectedLocation,
      });
    };
    return (
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{selectedPlace.address}</Text>
          </View>
          <MapPreview
            style={styles.mapPreview}
            location={selectedLocation}
            onPress={showMapHandler}
          />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>Error getting the place</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc',
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: colors.primary,
    textAlign: 'center',
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
