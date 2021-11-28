import { EdmTrainEvent } from '../edmTrain/types';

export interface EventImageInfo {
  imageUrl?: string;
  spotifyArtistId?: string;
}

export type FavoriteEvent = Pick<EdmTrainEvent, 'createdDate'>;
