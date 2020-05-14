import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import colors from '../../constants/colors';

interface NewPlaceScreenProps {}

export const NewPlaceScreen: React.FC<NewPlaceScreenProps> = ({}) => {
  const [titleValue, setTitleValue] = useState('');

  const titleChangeHandler = (text: string) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {};

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
