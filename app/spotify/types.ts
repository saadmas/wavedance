export type SpotifyItemType = 'artist' | 'track' | 'album';

export interface SpotifyItem {
  id: string;
  type: SpotifyItemType;
  title: string;
  subtitle?: string;
  photoUri?: string;
  contentUri: string;
}
