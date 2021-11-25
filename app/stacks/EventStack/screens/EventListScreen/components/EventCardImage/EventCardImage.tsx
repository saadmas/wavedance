import * as React from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { Button, IconButton, Surface, useTheme } from 'react-native-paper';
import firebase from 'firebase';
import { FirebaseNode } from '../../../../../../firebase/keys';
import { getFirebasePath } from '../../../../../../firebase/utils';
import LottieAnimation from '../../../../../../components/LottieAnimation/LottieAnimation';
import { PlaceholderMedia } from 'rn-placeholder/lib/PlaceholderMedia';
import { Fade, Placeholder } from 'rn-placeholder';

interface EventCardImageProps {
  locationId: number;
  eventId: number;
}

// null = failed to get image source
// undefined = yet to fetch image source
// string = URI for the image
type ImageSource = string | null | undefined;

export const eventCardImageHeight = 350;

const EventCardImage = ({ locationId, eventId }: EventCardImageProps) => {
  const { colors } = useTheme();
  const backgroundColor = colors.background;
  const borderRadius = 10;
  const iconButtonSize = 40;

  const [source, setSource] = React.useState<ImageSource>(undefined);

  React.useEffect(() => {
    const fetchImageSource = async () => {
      try {
        const path = getFirebasePath(FirebaseNode.EventPhotos, locationId.toString(), eventId.toString());
        const url = await firebase.database().ref(path).get();
        if (url.val()) {
          setSource(url.val().imageUrl);
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

  const renderActionButtons = (): React.ReactNode => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          height: '100%',
          width: '100%',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '55%',
            position: 'relative',
            top: 12,
          }}
        >
          <IconButton
            icon={require('../../../../../../../assets/icons/spotify-icon.png')}
            size={iconButtonSize}
            color="#1DB954"
            onPress={() => {}}
          />
          <View>
            <Image
              source={require('../../../../../../../assets/icons/edm-train-icon.png')}
              style={{ height: iconButtonSize, width: iconButtonSize, borderRadius: 1000 }}
            />
          </View>
          <LottieAnimation
            source={require(`'../../../../../../../assets/animations/heart-favorite.json`)}
            finalFramePosition={1}
            shouldLoop={false}
            style={{
              width: iconButtonSize + 8,
              height: iconButtonSize + 8,
            }}
          />
        </View>
      </View>
    );
  };

  const renderImageContent = (): React.ReactNode => {
    // Loading
    if (source === undefined) {
      return (
        <Placeholder Animation={Fade}>
          <PlaceholderMedia
            style={{
              backgroundColor,
              height: eventCardImageHeight,
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
      <ImageBackground
        source={{ uri: source }}
        onError={onUriLoadError}
        style={{ height: '100%', width: '100%' }}
        borderRadius={borderRadius}
        resizeMode="cover"
      >
        {renderActionButtons()}
      </ImageBackground>
    );
  };

  return (
    <Surface
      style={{
        marginTop: 5,
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

export default EventCardImage;
