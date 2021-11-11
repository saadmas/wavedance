import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';
import 'firebase/storage';
import Constants from 'expo-constants';
import * as FirebaseCore from 'expo-firebase-core';

const firebaseConfig = {};

export function initializeFirebase() {
  const config = FirebaseCore.DEFAULT_WEB_APP_OPTIONS;

  if (!firebase.apps.length) {
    firebase.initializeApp(config as FirebaseCore.IFirebaseOptions);

    if (__DEV__) {
      console.log('Switching to local Firebase instance...');
      const origin = Constants.manifest?.debuggerHost?.split(':').shift() || 'localhost';

      firebase.auth().useEmulator(`http://${origin}:9099/`);
      firebase.database().useEmulator(origin, 9000);
      firebase.functions().useEmulator(origin, 5001);
    }
  }
}
