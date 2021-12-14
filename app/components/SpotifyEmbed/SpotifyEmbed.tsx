import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

interface SpotifyEmbedProps {
  uri?: string;
}

const SpotifyEmbed = ({ uri }: SpotifyEmbedProps) => {
  const { colors } = useTheme();
  const [isError, setIsError] = React.useState<boolean>(!uri);
  const marginVertical = 10;

  React.useEffect(() => {
    setIsError(!uri);
  }, [uri]);

  const onEmbedError = () => {
    setIsError(true);
  };

  return uri ? (
    <ScrollView>
      <WebView
        bounces={false}
        onError={onEmbedError}
        javaScriptEnabled={true}
        style={{ height: 80, width: '100%', marginVertical, backgroundColor: colors.background }}
        source={{ uri }}
      />
    </ScrollView>
  ) : null;
};

export default SpotifyEmbed;
