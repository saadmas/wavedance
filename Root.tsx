import * as React from 'react';
import App from './app/App';
import { initializeFirebase } from './app/firebase/config';

initializeFirebase();

const Root = () => {
  return <App />;
};

export default Root;
