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

interface NewPlaceScreenProps extends PlacesNavProps<'NewPlaceScreen'> {}

export const NewPlaceScreen: React.FC<NewPlaceScreenProps> = ({
  navigation,
}) => {
  const [titleValue, setTitleValue] = useState('');
  const dispatch = useDispatch();

  const titleChangeHandler = (text: string) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(addPlace(titleValue));
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
