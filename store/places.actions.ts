import * as FileSystem from 'expo-file-system';
import { ThunkAction } from 'redux-thunk';

import { RootState } from './index';

export const ADD_PLACE = 'ADD_PLACE';

interface AddPlaceAction {
  type: typeof ADD_PLACE;
  placeData: {
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
  } catch (err) {
    console.log(err);
    throw err;
  }

  dispatch({ type: ADD_PLACE, placeData: { title, image: newPath } });
};
