import React from 'react';
import { TouchableOpacity, Image, StyleSheet, ViewStyle } from 'react-native';

import { vars } from '../../constants/env';
import { LatLng } from 'react-native-maps';

interface MapPreviewProps {
  location?: LatLng;
  style: ViewStyle;
  onPress: () => void;
}

export const MapPreview: React.FC<MapPreviewProps> = ({
  location,
  children,
  style: overrideStyles,
  onPress,
}) => {
  let imagePreviewUrl;
  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.latitude},${location.longitude}&key=${vars.googleApiKey}`;
  }

  return (
    <TouchableOpacity
      style={{ ...styles.mapPreview, ...overrideStyles }}
      onPress={onPress}
    >
      {location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});
