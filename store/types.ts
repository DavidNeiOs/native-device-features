export type Place = {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  lat: number;
  lng: number;
};

export type PlacesState = {
  places: Place[];
};
