export type SpotifyItemType = 'artist' | 'track' | 'album';

export interface SpotifyItem {
  id: string;
  type: SpotifyItemType;
  title: string;
  contentUri: string;
  subtitle?: string;
  photoUri?: string;
}
