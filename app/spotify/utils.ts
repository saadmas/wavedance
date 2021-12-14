import firebase from 'firebase';
import SpotifyWebApi from 'spotify-web-api-js';
import { EventPrompt } from '../state/enums/eventPrompt';
import { Prompt } from '../state/enums/prompt';
import { SpotifyItem, SpotifyItemType } from './types';

const spotifyWebApi = new SpotifyWebApi();

export const spotifyEmbeddablePrompts = new Map<Prompt | EventPrompt, SpotifyItemType>([
  [Prompt.FavoriteAlbum, 'album'],
  [Prompt.FavoriteEP, 'album'],
  [Prompt.FavoriteArtist, 'artist'],
  [Prompt.MostAnticipatedArtist, 'artist'],
  [Prompt.MostUnderratedArtist, 'artist'],
  [Prompt.FavoriteRecordLabel, 'artist'],
  [Prompt.FavoriteSong, 'track'],
  [Prompt.FavoriteRemix, 'track'],
  [Prompt.FavoriteCollab, 'track'],
  [Prompt.FavoriteLyrics, 'track'],
  [Prompt.FavoriteThrowbackTrack, 'track'],
  [Prompt.GuiltyPleasureSong, 'track'],
  [Prompt.PerfectSunsetTrack, 'track'],
  [Prompt.SongToCheerUp, 'track'],
  [Prompt.RemixBetterThanOriginal, 'track'],
  [EventPrompt.FavSongByArtist, 'track'],
  [EventPrompt.OneSongLive, 'track'],
]);

const tryGetRetryAfter = (error: any): number => {
  return error?.['headers']?.['retry-after'] ?? NaN;
};

export const fetchSpotifyItems = async (
  searchText: string,
  prompt: EventPrompt | Prompt,
  errorHandler: () => void
): Promise<SpotifyItem[]> => {
  const type = spotifyEmbeddablePrompts.get(prompt);
  const limit = 10;
  let spotifyItems: SpotifyItem[] = [];

  try {
    switch (type) {
      case 'artist':
        const artistResponse = await spotifyWebApi.searchArtists(searchText, { limit });
        spotifyItems = artistResponse.artists.items.map(({ id, name, images }) => ({
          type,
          id,
          title: name,
          photoUri: images[0]?.url,
        }));
        break;
      case 'album':
        const albumResponse = await spotifyWebApi.searchAlbums(searchText, { limit });
        spotifyItems = albumResponse.albums.items.map(({ id, name, images }) => ({
          type,
          id,
          title: name,
          photoUri: images[0]?.url,
        }));
        break;
      case 'track':
        const trackResponse = await spotifyWebApi.searchTracks(searchText, { limit });
        spotifyItems = trackResponse.tracks.items.map(({ id, name, artists }) => ({
          type,
          id,
          title: name,
          subtitle: artists.map(a => a.name).join(', '),
        }));
        break;
      default:
        break;
    }
  } catch (e) {
    if (e.status === 401) {
      const token = await fetchSpotifyAccessToken(errorHandler);
      if (token) {
        spotifyWebApi.setAccessToken(token);
        return await fetchSpotifyItems(searchText, prompt, errorHandler);
      }
    }

    const retryAfter = tryGetRetryAfter(e);
    if (retryAfter) {
      await new Promise(r => setTimeout(r, retryAfter * 1000 + 1000));
      return await fetchSpotifyItems(searchText, prompt, errorHandler);
    }

    errorHandler();
  }

  return spotifyItems;
};

export const fetchSpotifyAccessToken = async (errorHandler: () => void): Promise<string | undefined> => {
  try {
    const fetchSpotifyToken = firebase.functions().httpsCallable('fetchSpotifyToken');
    const { data } = await fetchSpotifyToken();
    return data.accessToken;
  } catch (e) {
    console.error('fetchSpotifyAccessToken failed');
    console.error(e);
    errorHandler();
  }
};
