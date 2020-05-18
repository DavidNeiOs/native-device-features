import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';

import { vars } from '../../env';

interface MapPreviewProps {
  location?: {
    lat: number;
    lng: number;
  };
  style: ViewStyle;
}

export const MapPreview: React.FC<MapPreviewProps> = ({
  location,
  children,
  style: overrideStyles,
}) => {
  let imagePreviewUrl;
  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${vars.googleApiKey}`;
  }

  return (
    <View style={{ ...styles.mapPreview, ...overrideStyles }}>
      {location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      )}
    </View>
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
