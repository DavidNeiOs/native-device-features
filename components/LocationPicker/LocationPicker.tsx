import React, { useState } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import colors from '../../constants/colors';
import { MapPreview } from '../MapPreview';
import { PlacesParamList } from '../../navigation/PlacesNavigator';

interface LocationPickerProps {
  navigate: (screen: keyof PlacesParamList) => void;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({ navigate }) => {
  const [pickedLocation, setPickedLocation] = useState<
    | {
        lat: number;
        lng: number;
      }
    | undefined
  >(undefined);
  const [isFetching, setIsFetching] = useState(false);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insuficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermissions = verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        'Could not fetch location',
        'Please try again later or pick a location on the map',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    navigate('MapScreen');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size='large' />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title='Get user location'
          color={colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title='Pick on map'
          color={colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
