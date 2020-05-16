import { createStore, combineReducers, applyMiddleware } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import placesReducer from './places.reducer';

const rootReducer = combineReducers({
  places: placesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
