import * as React from 'react';
import { Image } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import firebase from 'firebase';
import { FirebaseNode } from '../../../../../../firebase/keys';
import { getFirebasePath } from '../../../../../../firebase/utils';
import LottieAnimation from '../../../../../../components/LottieAnimation/LottieAnimation';
import { PlaceholderMedia } from 'rn-placeholder/lib/PlaceholderMedia';
import { Fade, Placeholder } from 'rn-placeholder';

interface EventImageProps {
  setSpotifyArtistId: (artistId: string) => void;
  locationId: number;
  eventId: number;
}

// null = failed to get image source
// undefined = yet to fetch image source
// string = URI for the image
type ImageSource = string | null | undefined;

export const eventCardImageHeight = 350;

const EventImage = ({ locationId, eventId, setSpotifyArtistId }: EventImageProps) => {
  const { colors } = useTheme();
  const backgroundColor = colors.background;
  const borderRadius = 10;

  const [source, setSource] = React.useState<ImageSource>(undefined);

  React.useEffect(() => {
    const fetchImageSource = async () => {
      try {
        const path = getFirebasePath(FirebaseNode.EventPhotos, locationId.toString(), eventId.toString());
        const url = await firebase.database().ref(path).get();
        if (url.val()) {
          const eventPhotoDetails = url.val();
          setSource(eventPhotoDetails.imageUrl);
          setSpotifyArtistId(eventPhotoDetails.spotifyArtistId);
        } else {
          setSource(null);
        }
      } catch (e) {
        console.error('fetchImageSource failed:');
        console.error(e);
        setSource(null);
      }
    };

    fetchImageSource();
  }, [locationId, eventId]);

  const onUriLoadError = () => {
    setSource(null);
  };

  const renderImageContent = (): React.ReactNode => {
    // Loading
    if (source === undefined) {
      return (
        <Placeholder Animation={Fade}>
          <PlaceholderMedia
            style={{
              backgroundColor,
              height: '100%',
              width: '100%',
            }}
          />
        </Placeholder>
      );
    }

    // Failed to fetch source URI
    if (source === null) {
      return (
        <LottieAnimation
          source={require(`../../../../../../../assets/animations/dj-mixer.json`)}
          finalFramePosition={1}
          shouldLoop={false}
        />
      );
    }

    // Valid source URI
    return (
      <Image
        source={{ uri: source }}
        onError={onUriLoadError}
        style={{ height: '100%', width: '100%' }}
        borderRadius={borderRadius}
        resizeMode="cover"
      />
    );
  };

  return (
    <Surface
      style={{
        marginBottom: 10,
        height: eventCardImageHeight,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 12,
        borderRadius,
      }}
    >
      {renderImageContent()}
    </Surface>
  );
};

export default EventImage;
