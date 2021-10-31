import * as React from 'react';
import App from './app/App';
import { AuthProvider } from './app/state/auth/AuthProvider';

const Root = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default Root;
