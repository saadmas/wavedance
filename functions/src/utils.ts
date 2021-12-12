import got from 'got';
import { Artist, EdmTrainArtist, EdmTrainEvent, EdmTrainResponse, EventImageInfo, SpotifyArtistImage } from './types';

const edmTrainApiKey = '224d286b-9da6-4b89-baab-c7cd0640cd72&livestreamInd=false';

const spotifyNonElectronicGenres = new Set([
  'acoustic',
  'alt-rock',
  'anime',
  'black-metal',
  'bluegrass',
  'blues',
  'bossanova',
  'brazil',
  'cantopop',
  'children',
  'classical',
  'comedy',
  'country',
  'death-metal',
  'disney',
  'emo',
  'folk',
  'forro',
  'gospel',
  'goth',
  'grindcore',
  'groove',
  'grunge',
  'guitar',
  'happy',
  'hard-rock',
  'hardcore',
  'heavy-metal',
  'hip-hop',
  'holidays',
  'honky-tonk',
  'indian',
  'indie',
  'indie-pop',
  'iranian',
  'j-idol',
  'j-pop',
  'j-rock',
  'jazz',
  'k-pop',
  'kids',
  'latin',
  'latino',
  'malay',
  'mandopop',
  'metal',
  'metal-misc',
  'metalcore',
  'mpb',
  'new-age',
  'new-release',
  'opera',
  'pagode',
  'philippines-opm',
  'psych-rock',
  'punk',
  'punk-rock',
  'r-n-b',
  'rock',
  'rock-n-roll',
  'salsa',
  'samba',
  'sertanejo',
  'show-tunes',
  'singer-songwriter',
  'ska',
  'songwriter',
  'soul',
  'spanish',
  'swedish',
  'tango',
  'world-music',
]);

export const getEdmTrainEvents = async (locationId: number): Promise<EdmTrainEvent[] | undefined> => {
  try {
    //* endDate
    const edmTrainUrl = `https://edmtrain.com/api/events?locationIds=${locationId}&client=${edmTrainApiKey}`;
    const edmTrainResponse = (await got(edmTrainUrl).json()) as EdmTrainResponse;

    if (!edmTrainResponse?.success) {
      throw Error('EDM Train Response success field is false');
    }

    return edmTrainResponse?.data;
  } catch (e) {
    console.error(`getEdmTrainEvents failed for location ${locationId}`);
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

const cleanArtistName = (name: string) => {
  const regex = new RegExp('/the|a /gi');
  const cleanedName = name.replace(regex, '').trim().toLowerCase();
  return cleanedName;
};

const getClosedMatchingSpotifyArtist = (
  artistName: string,
  spotifyArtists: EventImageInfo[]
): EventImageInfo | undefined => {
  const closedMatchingSpotifyArtist = spotifyArtists.find(artist => {
    const artistNameToMatch = cleanArtistName(artistName);
    const currentArtistName = cleanArtistName(artist.name);
    const isNameMatch = artistNameToMatch.includes(currentArtistName);

    if (!isNameMatch) {
      return false;
    }

    const isElectronic = artist.genres.length
      ? artist.genres.some(genre => !spotifyNonElectronicGenres.has(genre))
      : true;

    return isElectronic;
  });
  return closedMatchingSpotifyArtist;
};

const searchSpotifyForArtist = async (artistName: string, spotifyApi: any): Promise<EventImageInfo | undefined> => {
  try {
    const searchResult = await spotifyApi.searchArtists(artistName);
    const matchedArtist = getClosedMatchingSpotifyArtist(artistName, searchResult?.body?.artists?.items ?? []);
    return matchedArtist;
  } catch (e) {
    const retryAfter = tryGetRetryAfter(e);

    if (retryAfter) {
      await new Promise(r => setTimeout(r, retryAfter * 1000 + 1000));
      return searchSpotifyForArtist(artistName, spotifyApi);
    }

    console.error('searchSpotifyForArtist failed');
    console.error(e);
  }
  return;
};

const getSpotifyArtist = async (edmTrainArtist: EdmTrainArtist, spotifyApi: any): Promise<Artist | undefined> => {
  const spotifyArtist = await searchSpotifyForArtist(edmTrainArtist.name, spotifyApi);

  if (!spotifyArtist?.images?.length) {
    return;
  }

  const { images, popularity, id } = spotifyArtist;
  const highestResImageUrl = getHighestResolutionImageUrl(images);

  const artist: Artist = {
    popularity,
    imageUrl: highestResImageUrl,
    spotifyArtistId: id,
    edmTrainArtistId: edmTrainArtist.id,
  };

  return artist;
};

export const getEventPrimaryArtist = async (
  edmTrainArtists: EdmTrainArtist[],
  spotifyApi: any,
  cachedArtists: Map<number, Artist>
): Promise<Artist | undefined> => {
  let primaryArtist: Artist | undefined;

  for (const edmTrainArtist of edmTrainArtists) {
    const cachedArtist = cachedArtists.get(edmTrainArtist.id);
    const artist = cachedArtist ?? (await getSpotifyArtist(edmTrainArtist, spotifyApi));

    if (!artist) {
      continue;
    }

    const maxPopularity = primaryArtist?.popularity ?? -1;
    if (artist.popularity > maxPopularity) {
      primaryArtist = artist;
    }

    if (!cachedArtist) {
      cachedArtists.set(edmTrainArtist.id, artist);
    }
  }

  return primaryArtist;
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
