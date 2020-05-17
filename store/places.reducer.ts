import { PlacesState, Place } from './types';
import { PlacesActions, ADD_PLACE, SET_PLACES } from './places.actions';

const initialState: PlacesState = {
  places: [],
};

export default (state = initialState, action: PlacesActions) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace: Place = {
        id: action.placeData.id.toString(),
        title: action.placeData.title,
        imageUri: action.placeData.image,
        address: action.placeData.address,
        lat: action.placeData.lat,
        lng: action.placeData.lng,
      };
      return {
        ...state,
        places: state.places.concat(newPlace),
      };
    case SET_PLACES:
      return {
        ...state,
        places: action.places,
      };
    default:
      return state;
  }
};
