import * as React from 'react';
import { Surface } from 'react-native-paper';
import { FirebaseNode } from '../../../../../../firebase/keys';
import { getFirebasePath } from '../../../../../../firebase/utils';
import { ResponseStatus } from '../../../../../../state/enums/responseStatus';

interface WaveProfileEventProps {
  eventId: number;
}

const WaveProfileEventImage = ({}: WaveProfileEventProps) => {
  const [source, setSource] = React.useState<string | undefined>(undefined);
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading);

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
  return (
    <Surface
      style={{
        marginBottom: 10,
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 12,
        borderRadius: 10,
        // backgroundColor: source === undefined ? colors.background : undefined, ///
      }}
    >
      {renderImageContent()}
    </Surface>
  );
};

export default WaveProfileEventImage;
