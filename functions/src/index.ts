import * as functions from 'firebase-functions';
import { getEdmTrainEvents, getEventPhotoUrl, initializeSpotifyApi } from './utils';
import * as admin from 'firebase-admin';
const SpotifyWebApi = require('spotify-web-api-node');

admin.initializeApp();

exports.fetchSpotifyArtists = functions
  .runWith({ timeoutSeconds: 540 }) ///
  .database.ref('foo')
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

    const edmTrainLocationIds = [70]; /// get all

    for (const edmTrainLocationId of edmTrainLocationIds) {
      let edmTrainEvents = await getEdmTrainEvents(edmTrainLocationId);

      if (!edmTrainEvents?.length) {
        continue;
      }

      // K = Event ID, V = Photo URL for the event
      const eventPhotoMap = new Map<number, string>();

      for (const edmTrainEvent of edmTrainEvents) {
        const { id, artistList } = edmTrainEvent;

        const artistNames = artistList.map(artist => artist.name);
        const eventPhotoUrl = await getEventPhotoUrl(artistNames, spotifyApi);

        if (eventPhotoUrl) {
          eventPhotoMap.set(id, eventPhotoUrl);
        }
      }

      const path = `eventPhotos/${edmTrainLocationId}`;
      admin.database().ref(path).set(Object.fromEntries(eventPhotoMap));
    }

    console.log('succesfully ran!');
  });
