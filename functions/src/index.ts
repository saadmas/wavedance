import * as functions from 'firebase-functions';
import { getEdmTrainEvents, getEventPrimaryArtist, initializeSpotifyApi } from './utils';
import * as admin from 'firebase-admin';
import { Artist } from './types';
import { getEdmTrainCities } from './edmTrainLocations';
const SpotifyWebApi = require('spotify-web-api-node');

admin.initializeApp();

exports.fetchAndStoreEventArtists = functions
  .runWith({ timeoutSeconds: 540 })
  .database.ref('bar')
  .onUpdate(async (snapshot, context) => {
    const spotifyApi = new SpotifyWebApi({
      clientId: '1eda7d1f51ad4bb58e0179b33f75716e',
      clientSecret: functions.config()['envs']['spotifyclientsecret'],
      redirectUri: '',
    });

    const spotifyApiInitSuccess = await initializeSpotifyApi(spotifyApi);

    if (!spotifyApiInitSuccess) {
      return;
    }

    //* get states too!
    const edmTrainLocationIds = [...getEdmTrainCities().values()].map(city => city.id);

    // K = EDM Train Artist ID, V = Artist to store in Firebase
    const cachedArtists: Map<number, Artist> = new Map();

    for (const edmTrainLocationId of edmTrainLocationIds) {
      let locationEvents = await getEdmTrainEvents(edmTrainLocationId);

      if (!locationEvents?.length) {
        continue;
      }

      //* dont slice!
      locationEvents = locationEvents.slice(0, 100);

      // K = EDM Train Event ID, V = primary artist for the event
      const eventArtistMap = new Map<number, Artist>();

      for (const locationEvent of locationEvents) {
        const { id, artistList } = locationEvent;

        const eventPrimaryArtist = await getEventPrimaryArtist(artistList, spotifyApi, cachedArtists);

        if (eventPrimaryArtist) {
          eventArtistMap.set(id, eventPrimaryArtist);
        }
      }

      const path = `eventPhotos/${edmTrainLocationId}`;
      admin.database().ref(path).set(Object.fromEntries(eventArtistMap));
    }

    console.info('succesfully ran fetchAndStoreEventArtist!');
  });

exports.fetchSpotifyToken = functions.https.onCall(async (_, context) => {
  if (!process.env.FUNCTIONS_EMULATOR && !context.app) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called from an App Check verified app.'
    );
  }

  const spotifyApi = new SpotifyWebApi({
    clientId: '1eda7d1f51ad4bb58e0179b33f75716e',
    clientSecret: functions.config()['envs']['spotifyclientsecret'],
    redirectUri: '',
  });

  const spotifyApiInitSuccess = await initializeSpotifyApi(spotifyApi);

  const accessToken = spotifyApiInitSuccess ? spotifyApi.getAccessToken() : undefined;
  return { accessToken };
});
