import * as React from 'react';
import { Text } from 'react-native';
import App from './app/App';
import { AuthProvider } from './app/state/AuthProvider';

const Root = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default Root;
