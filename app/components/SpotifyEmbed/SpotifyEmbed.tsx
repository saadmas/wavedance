import * as React from 'react';
import { WebView } from 'react-native-webview';

interface SpotifyEmbedProps {
  uri: string;
}

const SpotifyEmbed = ({ uri }: SpotifyEmbedProps) => {
  const marginVertical = 20;

  return (
    <WebView
      scalesPageToFit={true}
      bounces={false}
      javaScriptEnabled={true}
      style={{ height: 80, width: '100%', marginVertical }}
      source={{ uri }}
    />
  );
};

export default SpotifyEmbed;
