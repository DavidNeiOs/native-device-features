import * as FileSystem from 'expo-file-system';
import { ThunkAction } from 'redux-thunk';

import { RootState } from './index';
import { insertPlace, fetchPlaces } from '../helpers/db';
import { Place } from './types';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

interface AddPlaceAction {
  type: typeof ADD_PLACE;
  placeData: {
    id: number;
    title: string;
    image: string;
    address: string;
    lat: number;
    lng: number;
  };
}

interface SetPlacesAction {
  type: typeof SET_PLACES;
  places: Place[];
}

export type PlacesActions = AddPlaceAction | SetPlacesAction;
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
      placeData: {
        id: dbResult.insertId,
        title,
        image: newPath,
        address: 'dummy adress',
        lat: 15.6,
        lng: 12.3,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadPlaces = (): ThunkResult<void> => async (dispatch) => {
  try {
    const dbResult = await fetchPlaces();
    console.log(dbResult);
    dispatch({
      type: SET_PLACES,
      // @ts-ignore _array not part of rows object in types
      places: dbResult.rows._array.map((pl) => ({
        ...pl,
        id: pl.id.toString(),
      })),
    });
  } catch (err) {
    throw err;
  }
};
