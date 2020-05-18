import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Region } from 'react-native-maps';

interface MapScreenProps {}

export const MapScreen: React.FC<MapScreenProps> = ({}) => {
  const mapRegion: Region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return <MapView style={styles.map} region={mapRegion} />;
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
