import firebase from 'firebase';
import * as React from 'react';
import { Image } from 'react-native';
import { Surface } from 'react-native-paper';
import LottieAnimation from '../../../../../../components/LottieAnimation/LottieAnimation';
import { FirebaseNode } from '../../../../../../firebase/keys';
import { getFirebasePath } from '../../../../../../firebase/utils';
import { ResponseStatus } from '../../../../../../state/enums/responseStatus';

interface WaveProfileEventProps {
  eventId: number;
  locationId: number;
}

const WaveProfileEventImage = ({ eventId, locationId }: WaveProfileEventProps) => {
  const borderRadius = 10;
  const size = 80;

  const [uri, setUri] = React.useState<string | undefined>(undefined);
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading);

  const onError = () => {
    setResponseStatus(ResponseStatus.Error);
  };

  React.useEffect(() => {
    const fetchEventImage = async () => {
      try {
        // const path = getFirebasePath(FirebaseNode.EventPhotos, locationId.toString(), eventId.toString());
        //* undo once all images fetched via cloud fns
        const path = getFirebasePath(FirebaseNode.EventPhotos, '70', '159624');
        const snapshot = await firebase.database().ref(path).get();
        const value = snapshot.val();

        console.log(value);

        if (!value) {
          onError();
          return;
        }

        setUri(value.imageUrl);
        setResponseStatus(ResponseStatus.Success);
      } catch (e) {
        onError();
        console.error('fetchEventImage failed:');
        console.error(e);
      }
    };

    fetchEventImage();
  }, [eventId, locationId]);

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
        return null; //* replace with wavedance logo
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
            source={{ uri }}
            onError={onError}
            style={{ height: '100%', width: '100%' }}
            borderRadius={borderRadius}
            resizeMode="cover"
          />
        );
    }
  };

  return (
    <Surface
      style={{
        marginTop: 10,
        height: size,
        width: size,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 12,
        borderRadius,
        // backgroundColor: source === undefined ? colors.background : undefined, ///
      }}
    >
      {renderImageContent()}
    </Surface>
  );
};

export default WaveProfileEventImage;
