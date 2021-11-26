import { EdmTrainEvent } from '../edmTrain/types';

export interface FavoriteEvent extends EdmTrainEvent {
  locationId: number;
  spotifyArtistId?: string;
  spotifyArtistImageUri?: string;
}
