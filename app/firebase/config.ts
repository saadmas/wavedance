import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';
import 'firebase/storage';
import Constants from 'expo-constants';
import * as FirebaseCore from 'expo-firebase-core';

export function initializeFirebase() {
  if (firebase.apps.length) {
    return;
  }

  const config = FirebaseCore.DEFAULT_WEB_APP_OPTIONS;
  firebase.initializeApp(config as FirebaseCore.IFirebaseOptions);

  if (__DEV__) {
    console.info('Switching to local Firebase instance...');
    const origin = Constants.manifest?.debuggerHost?.split(':').shift() || 'localhost';

    firebase.setLogLevel('debug');
    firebase.auth().useEmulator(`http://${origin}:9099/`);
    firebase.database().useEmulator(origin, 9000);
    firebase.functions().useEmulator(origin, 5001);
  }
}
