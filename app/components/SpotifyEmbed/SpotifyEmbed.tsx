import * as React from 'react';
import { Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

interface SpotifyEmbedProps {
  photoUri?: string;
  contentUri?: string;
}

const SpotifyEmbed = ({ photoUri, contentUri }: SpotifyEmbedProps) => {
  const [isError, setIsError] = React.useState<boolean>(!photoUri);

  React.useEffect(() => {
    setIsError(!photoUri);
  }, [photoUri]);

  const onError = () => {
    setIsError(true);
  };

  const openSpotifyWebpage = () => {
    if (contentUri) {
      WebBrowser.openBrowserAsync(contentUri);
    }
  };

  return photoUri && !isError ? (
    <TouchableWithoutFeedback onPress={openSpotifyWebpage}>
      <Image
        source={{ uri: photoUri }}
        onError={onError}
        style={{ height: 400, width: '100%', marginTop: 10 }}
        borderRadius={10}
        resizeMode="cover"
      />
    </TouchableWithoutFeedback>
  ) : null;
};

export default SpotifyEmbed;
