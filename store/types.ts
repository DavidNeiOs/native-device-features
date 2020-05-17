export type Place = {
  id: string;
  title: string;
  image: string;
  address: string;
  lat: number;
  lng: number;
};

export type PlacesState = {
  places: Place[];
};
