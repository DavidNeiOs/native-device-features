import React from 'react';
import { View, Button, Text, Image, Alert, StyleSheet } from 'react-native';
import * as ImgPicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import colors from '../../constants/colors';

interface ImagePickerProps {}

export const ImagePicker: React.FC<ImagePickerProps> = ({}) => {
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
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
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    ImgPicker.launchCameraAsync();
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No image picked yet.</Text>
        <Image style={styles.image} source={{ uri: '' }} />
      </View>
      <Button
        title='Take Image'
        color={colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
