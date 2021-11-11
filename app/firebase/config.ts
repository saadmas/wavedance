import firebase from 'firebase';
import 'firebase/functions';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: 'AIzaSyAtpBOcrFSu6eaYZyJSW8Kgdj7bA_dCzec',
  authDomain: 'wavedance-220ab.firebaseapp.com',
  databaseURL: 'https://wavedance-220ab-default-rtdb.firebaseio.com',
  projectId: 'wavedance-220ab',
  storageBucket: 'wavedance-220ab.appspot.com',
  messagingSenderId: '44744827788',
  appId: '1:44744827788:web:9b5b8be651deb086e0aca9',
  measurementId: 'G-BHE483SC59',
};

export const fb = firebase.initializeApp(firebaseConfig);

if (__DEV__) {
  console.log('Switching to local Firebase instance...');
  const origin = Constants.manifest?.debuggerHost?.split(':').shift() || 'localhost';

  fb.auth().useEmulator(`http://${origin}:9099/`);
  fb.firestore().useEmulator(origin, 8080);
  fb.functions().useEmulator(origin, 5001);
}
