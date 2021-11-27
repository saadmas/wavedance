import * as React from 'react';
import { Image } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import firebase from 'firebase';
import { FirebaseNode } from '../../../../../../firebase/keys';
import { getFirebasePath } from '../../../../../../firebase/utils';
import LottieAnimation from '../../../../../../components/LottieAnimation/LottieAnimation';
import { SpotifyArtist } from '../EventCard/EventCard';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface EventImageProps {
  locationId: number;
  eventId: number;
  setSpotifyArtist: (artist: SpotifyArtist) => void;
  onImagePress: () => void;
}

// null = failed to get image source
// undefined = yet to fetch image source
// string = URI for the image
type ImageSource = string | null | undefined;

export const eventCardImageHeight = 350;

const EventImage = ({ locationId, eventId, setSpotifyArtist, onImagePress }: EventImageProps) => {
  const { colors } = useTheme();
  const borderRadius = 10;

  const [source, setSource] = React.useState<ImageSource>(undefined);

  React.useEffect(() => {
    let mounted = true;

    const fetchImageSource = async () => {
      try {
        const path = getFirebasePath(FirebaseNode.EventPhotos, locationId.toString(), eventId.toString());
        const url = await firebase.database().ref(path).get();
        if (url.val()) {
          const { imageUrl, spotifyArtistId } = url.val();
          setSource(imageUrl);
          setSpotifyArtist({ spotifyArtistId, spotifyArtistImageUri: imageUrl });
        } else {
          setSource(null);
        }
      } catch (e) {
        console.error('fetchImageSource failed:');
        console.error(e);
        setSource(null);
      }
    };

    if (mounted) {
      fetchImageSource();
    }

    return () => {
      mounted = false;
    };
  }, [locationId, eventId]);

  const onUriLoadError = () => {
    setSource(null);
  };

  const renderImageContent = (): React.ReactNode => {
    // Loading
    if (source === undefined) {
      return; //* check speed in prod!
      // return (
      //   <Placeholder Animation={Fade}>
      //     <PlaceholderMedia
      //       style={{
      //         backgroundColor,
      //         height: '100%',
      //         width: '100%',
      //       }}
      //     />
      //   </Placeholder>
      // );
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
    <TouchableWithoutFeedback onPress={onImagePress}>
      <Surface
        style={{
          marginBottom: 10,
          height: eventCardImageHeight,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 12,
          borderRadius,
          backgroundColor: source === undefined ? colors.background : undefined,
        }}
      >
        {renderImageContent()}
      </Surface>
    </TouchableWithoutFeedback>
  );
};

export default EventImage;
