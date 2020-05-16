export const ADD_PLACE = 'ADD_PLACE';

interface AddPlaceAction {
  type: typeof ADD_PLACE;
  placeData: {
    title: string;
  };
}

export const addPlace = (title: string) => {
  return { type: ADD_PLACE, placeData: { title } };
};

export type PlacesActions = AddPlaceAction;
