import { PlacesState, Place } from './types';
import { PlacesActions, ADD_PLACE } from './places.actions';

const initialState: PlacesState = {
  places: [],
};

export default (state = initialState, action: PlacesActions) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace: Place = {
        id: new Date().toISOString(),
        title: action.placeData.title,
        image: action.placeData.image,
      };
      return {
        ...state,
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
