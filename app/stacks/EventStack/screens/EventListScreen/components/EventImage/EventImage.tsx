import * as React from 'react';
import { Image } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import LottieAnimation from '../../../../../../components/LottieAnimation/LottieAnimation';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ResponseStatus } from '../../../../../../state/enums/responseStatus';
import { useEventImageCache, useEventImageCacheUpdater } from '../../../../../../state/events/EventImageCacheProvider';
import { getFirebasePath } from '../../../../../../firebase/utils';
import { FirebaseNode } from '../../../../../../firebase/keys';
import firebase from 'firebase';
import { EventImageInfo } from '../../../../../../firebase/types';

interface EventImageProps {
  locationId: number;
  eventId: number;
  onImagePress: () => void;
}

export const eventCardImageHeight = 340;

const EventImage = ({ locationId, eventId, onImagePress }: EventImageProps) => {
  const eventImageCache = useEventImageCache();
  const { colors } = useTheme();
  const borderRadius = 10;

  const [source, setSource] = React.useState<string | undefined>(eventImageCache.get(eventId)?.imageUrl);
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading);

  const imageCacheUpdater = useEventImageCacheUpdater();

  const onError = () => {
    setResponseStatus(ResponseStatus.Error);
  };

  React.useEffect(() => {
    if (source) {
      setResponseStatus(ResponseStatus.Success);
      return;
    }

    const fetchEventImage = async () => {
      try {
        const path = getFirebasePath(FirebaseNode.EventPhotos, locationId.toString(), eventId.toString());
        const snapshot = await firebase.database().ref(path).get();
        const snapshotValue = snapshot.val();

        if (!snapshotValue) {
          onError();
          return;
        }

        const { imageUrl, spotifyArtistId } = snapshotValue;
        const eventImageInfo: EventImageInfo = { imageUrl, spotifyArtistId };

        imageCacheUpdater(prevCache => {
          prevCache.set(eventId, eventImageInfo);
          return new Map(prevCache);
        });

        setSource(eventImageInfo.imageUrl);
        setResponseStatus(ResponseStatus.Success);
      } catch (e) {
        onError();
        console.error('fetchEventImage failed:');
        console.error(e);
      }
    };

    fetchEventImage();
  }, [source]);

  const renderImageContent = (): React.ReactNode => {
    switch (responseStatus) {
      case ResponseStatus.Loading:
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
      case ResponseStatus.Error:
        return null; ///
        return (
          <LottieAnimation
            source={require(`../../../../../../../assets/animations/dj-mixer.json`)}
            finalFramePosition={1}
            shouldLoop={false}
          />
        );
      case ResponseStatus.Success:
        return (
          <Image
            source={{ uri: source }}
            onError={onError}
            style={{ height: '100%', width: '100%' }}
            borderRadius={borderRadius}
            resizeMode="cover"
          />
        );
    }
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
