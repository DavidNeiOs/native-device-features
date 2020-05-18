import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MapView, { Region, MapEvent, Marker, LatLng } from 'react-native-maps';

import { PlacesNavProps } from '../../navigation/PlacesNavigator';
import colors from '../../constants/colors';

interface MapScreenProps extends PlacesNavProps<'MapScreen'> {}

export const MapScreen: React.FC<MapScreenProps> = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState<
    LatLng | undefined
  >();

  const saveLocationHandler = useCallback(() => {
    if (!selectedLocation) return;
    navigation.navigate('NewPlaceScreen', { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={saveLocationHandler}
        >
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, saveLocationHandler]);

  const mapRegion: Region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: MapEvent) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {selectedLocation ? (
        <Marker
          title='Selected location'
          coordinate={selectedLocation}
        ></Marker>
      ) : null}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : colors.primary,
  },
});
