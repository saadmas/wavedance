export interface EventImageInfo {
  id: string;
  name: string;
  popularity: number;
  genres: string[];
  images: SpotifyArtistImage[];
}

export interface SpotifyArtistImage {
  height: number;
  width: number;
  url: string;
}

export interface Artist {
  edmTrainArtistId: number;
  spotifyArtistId: string;
  imageUrl: string;
  popularity: number;
}

export interface EdmTrainLocation {
  id: number;
  state: string;
  stateCode: string;
  latitude: number;
  longitude: number;
  link: string;
  city: string | null;
}

export interface EdmTrainResponse {
  data: EdmTrainEvent[];
  success: boolean;
  message?: string;
}

export interface EdmTrainEvent {
  id: number;
  link: string;
  name: string | null;
  ages: string;
  festivalInd: boolean;
  livestreamInd: boolean;
  electronicGenreInd: boolean;
  otherGenreInd: boolean;
  date: string; // YYYY-MM-DD
  startTime: string | null;
  endTime: string | null;
  createdDate: string; // e.g. '2016-12-08T18:39:58Z'
  venue: EdmTrainVenue;
  artistList: EdmTrainArtist[];
}

interface EdmTrainVenue {
  id: number;
  name: string;
  location: string;
  address: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface EdmTrainArtist {
  id: number;
  name: string;
  link: string;
  b2bInd: boolean;
}
