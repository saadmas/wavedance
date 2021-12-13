import firebase from 'firebase';
import SpotifyWebApi from 'spotify-web-api-js';
import { EventPrompt } from '../state/enums/eventPrompt';
import { Prompt } from '../state/enums/prompt';
import { SpotifyItem, SpotifyItemType } from './types';

const spotifyWebApi = new SpotifyWebApi();

export const spotifyEmbeddablePrompts: Map<Prompt | EventPrompt, SpotifyItemType> = new Map([
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
]);

export const fetchSpotifyItems = async (
  searchText: string,
  prompt: EventPrompt | Prompt,
  errorHandler: () => void
): Promise<SpotifyItem[]> => {
  const type = spotifyEmbeddablePrompts.get(prompt);
  let spotifyItems: SpotifyItem[] = [];

  try {
    switch (type) {
      case 'artist':
        const artistResponse = await spotifyWebApi.searchArtists(searchText);
        spotifyItems = artistResponse.artists.items.map(({ id, name, images }) => ({
          type,
          id,
          title: name,
          photoUri: images[0]?.url,
        }));
        break;
      case 'album':
        const albumResponse = await spotifyWebApi.searchAlbums(searchText);
        spotifyItems = albumResponse.albums.items.map(({ id, name, images }) => ({
          type,
          id,
          title: name,
          photoUri: images[0]?.url,
        }));
        break;
      case 'track':
        const trackResponse = await spotifyWebApi.searchTracks(searchText);
        spotifyItems = trackResponse.tracks.items.map(({ id, name, artists }) => ({
          type,
          id,
          title: name,
          subtitle: artists.map(a => a.name).join(','),
        }));
        break;
      default:
        break;
    }
  } catch (e) {
    switch (e.status) {
      case 401:
        const token = await fetchSpotifyAccessToken(errorHandler);
        if (token) {
          spotifyWebApi.setAccessToken(token);
          return await fetchSpotifyItems(searchText, prompt, errorHandler);
        }
      default:
        errorHandler();
    }
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
