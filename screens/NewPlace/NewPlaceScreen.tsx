import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { addPlace } from '../../store/places.actions';
import colors from '../../constants/colors';
import { PlacesNavProps } from '../../navigation/PlacesNavigator';
import { ImagePicker } from '../../components/ImagePicker';
import { LocationPicker } from '../../components/LocationPicker';

interface NewPlaceScreenProps extends PlacesNavProps<'NewPlaceScreen'> {}

export const NewPlaceScreen: React.FC<NewPlaceScreenProps> = ({
  navigation,
}) => {
  const [titleValue, setTitleValue] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();

  const imageTakenHandler = (text: string) => {
    setImage(text);
  };
  const titleChangeHandler = (text: string) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(addPlace(titleValue, image));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker />
        <Button
          title='Save Place'
          color={colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: '700',
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
