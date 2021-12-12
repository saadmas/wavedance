import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const useSpotifyAuth = () => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '46d0fb9462a743a28f2f1ea705f4b913',
      scopes: ['user-top-read', 'user-read-recently-played'],
      usePKCE: false,
      redirectUri: makeRedirectUri(),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
    }
  }, [response]);

  return { response, promptAsync };
};

export default useSpotifyAuth;
