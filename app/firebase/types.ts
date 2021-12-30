import { EdmTrainEvent } from '../edmTrain/types';

export interface ChatMessage {
  sentBy: string;
  timestamp: string;
  message: string;
  photoUrl?: string;
  event?: WaveEvent;
}

export interface EventImageInfo {
  imageUrl?: string;
  spotifyArtistId?: string;
}

export interface SubmittedReport {
  reportedUserId: string;
  actionType: string;
  report: string;
  category: string;
  date: string;
  details: string;
  eventId?: number;
}

export interface WaveEvent extends EdmTrainEvent {
  locationId: number;
}

export type FavoriteEvent = Pick<EdmTrainEvent, 'createdDate'>;
