import * as FileSystem from 'expo-file-system';
import { ThunkAction } from 'redux-thunk';

import { RootState } from './index';
import { insertPlace, fetchPlaces } from '../helpers/db';
import { Place } from './types';
import { vars } from '../constants/env';

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
  image: string,
  location: { lat: number; lng: number }
): ThunkResult<void> => async (dispatch) => {
  const fileName = image.split('/').pop();
  const newPath = FileSystem.documentDirectory
    ? FileSystem.documentDirectory + fileName
    : '';

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${vars.googleApiKey}`
  );
  if (!response) {
    throw new Error('Something went wrong');
  }

  const resData = await response.json();
  if (!resData.results) {
    throw new Error('Something went wrong');
  }

  const address = resData.results[0].formatted_address;

  try {
    await FileSystem.moveAsync({
      from: image,
      to: newPath,
    });
    const dbResult = await insertPlace(
      title,
      newPath,
      address,
      location.lat,
      location.lng
    );
    dispatch({
      type: ADD_PLACE,
      placeData: {
        id: dbResult.insertId,
        title,
        image: newPath,
        address,
        lat: location.lat,
        lng: location.lng,
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
