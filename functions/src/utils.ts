import got from 'got';
import { EdmTrainEvent, EdmTrainResponse, SpotifyArtistImage, SpotifyArtistImageResponse } from './types';

const edmTrainApiKey = '224d286b-9da6-4b89-baab-c7cd0640cd72&livestreamInd=false';

export const getEdmTrainEvents = async (locationId: number): Promise<EdmTrainEvent[] | undefined> => {
  try {
    const edmTrainUrl = `https://edmtrain.com/api/events?locationIds=${locationId}&client=${edmTrainApiKey}`;
    const edmTrainResponse = (await got(edmTrainUrl).json()) as EdmTrainResponse;

    if (!edmTrainResponse?.success) {
      throw Error('EDM Train Response success field is false');
    }

    return edmTrainResponse?.data;
  } catch (e) {
    console.error('getEdmTrainEvents failed');
    console.error(e);
    return;
  }
};

const getHighestResolutionImageUrl = (artistImages: SpotifyArtistImage[]): string => {
  let highestResolutionImage = artistImages[0];

  for (let i = 1; i < artistImages.length; i++) {
    const image = artistImages[i];
    if (image.width > highestResolutionImage.width) {
      highestResolutionImage = image;
    }
  }

  return highestResolutionImage.url;
};

const tryGetRetryAfter = (error: any): number => {
  return error?.['headers']?.['retry-after'] ?? NaN;
};

const searchSpotifyForArtist = async (artist: string, spotifyApi: any): Promise<any> => {
  try {
    const searchResult = await spotifyApi.searchArtists(artist);
    const matchedArtist = searchResult?.body?.artists?.items?.[0];
    return matchedArtist;
  } catch (e) {
    const retryAfter = tryGetRetryAfter(e);

    if (retryAfter) {
      await new Promise(r => setTimeout(r, retryAfter * 1000 + 1000));
      return searchSpotifyForArtist(artist, spotifyApi);
    }

    console.error('searchSpotifyForArtist failed');
    console.error(e);
  }
};

const getSpotifyArtistImageUrl = async (
  artist: string,
  spotifyApi: any
): Promise<SpotifyArtistImageResponse | undefined> => {
  const matchedArtist = await searchSpotifyForArtist(artist, spotifyApi);

  if (!matchedArtist?.images?.length) {
    return;
  }

  const { images, popularity } = matchedArtist;
  const highestResImageUrl = getHighestResolutionImageUrl(images);

  return { imageUrl: highestResImageUrl, popularity };
};

export const getEventPhotoUrl = async (artists: string[], spotifyApi: any): Promise<string | undefined> => {
  let maxPopularity = -1;
  let eventPhotoUrl: string | undefined;

  for (const artist of artists) {
    const artistImageResponse = await getSpotifyArtistImageUrl(artist, spotifyApi);

    if (!artistImageResponse) {
      continue;
    }

    const { imageUrl, popularity } = artistImageResponse;

    if (popularity > maxPopularity) {
      eventPhotoUrl = imageUrl;
      maxPopularity = popularity;
    }
  }

  return eventPhotoUrl;
};

export const initializeSpotifyApi = async (spotifyApi: any): Promise<boolean> => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);
    return true;
  } catch (e) {
    console.error('initializeSpotifyApi failed');
    console.error(e);
    return false;
  }
};
