import * as React from 'react';
import { ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

interface SpotifyEmbedProps {
  uri?: string;
}

const SpotifyEmbed = ({ uri }: SpotifyEmbedProps) => {
  const marginVertical = 10;

  return uri ? (
    <ScrollView>
      <WebView
        bounces={false}
        javaScriptEnabled={true}
        style={{ height: 80, width: '100%', marginVertical }}
        source={{ uri }}
      />
    </ScrollView>
  ) : null;
};

export default SpotifyEmbed;
