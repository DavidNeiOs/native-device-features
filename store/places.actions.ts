import * as FileSystem from 'expo-file-system';
import { ThunkAction } from 'redux-thunk';

import { RootState } from './index';
import { insertPlace } from '../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';

interface AddPlaceAction {
  type: typeof ADD_PLACE;
  placeData: {
    id: number;
    title: string;
    image: string;
  };
}
export type PlacesActions = AddPlaceAction;
type ThunkResult<R> = ThunkAction<R, RootState, undefined, PlacesActions>;

export const addPlace = (
  title: string,
  image: string
): ThunkResult<void> => async (dispatch) => {
  const fileName = image.split('/').pop();
  const newPath = FileSystem.documentDirectory
    ? FileSystem.documentDirectory + fileName
    : '';

  try {
    await FileSystem.moveAsync({
      from: image,
      to: newPath,
    });
    const dbResult = await insertPlace(
      title,
      newPath,
      'dummy adress',
      15.6,
      12.3
    );
    dispatch({
      type: ADD_PLACE,
      placeData: { id: dbResult.insertId, title, image: newPath },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
