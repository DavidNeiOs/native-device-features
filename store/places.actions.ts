export const ADD_PLACE = 'ADD_PLACE';

interface AddPlaceAction {
  type: typeof ADD_PLACE;
  placeData: {
    title: string;
    image: string;
  };
}

export const addPlace = (title: string, image: string) => {
  return { type: ADD_PLACE, placeData: { title, image } };
};

export type PlacesActions = AddPlaceAction;
