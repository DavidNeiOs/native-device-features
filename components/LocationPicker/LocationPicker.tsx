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

interface LocationPickerProps {}

export const LocationPicker: React.FC<LocationPickerProps> = ({}) => {
  const [pickedLocation, setPickedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
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
  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size='large' />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </View>
      <Button
        title='Get user location'
        color={colors.primary}
        onPress={getLocationHandler}
      />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
