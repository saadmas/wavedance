import firebase from 'firebase';
import { useQuery } from 'react-query';
import { FirebaseNode } from '../firebase/keys';
import { getFirebasePath } from '../firebase/utils';

export interface EventImageInfo {
  spotifyArtistId?: string;
  imageUrl?: string;
}

const fetchEventImage = async (eventId: number, locationId: number): Promise<EventImageInfo | null> => {
  try {
    const path = getFirebasePath(FirebaseNode.EventPhotos, locationId.toString(), eventId.toString());
    console.log(path); ///
    const snapshot = await firebase.database().ref(path).get();
    const snapshotValue = snapshot.val();
    if (snapshotValue) {
      const { imageUrl, spotifyArtistId } = snapshotValue;
      return { spotifyArtistId, imageUrl };
    }
    return null;
  } catch (e) {
    console.error('fetchImageSource failed:');
    console.error(e);
    return null;
  }
};

const useEventImageQuery = (eventId: number, locationId: number, enabled = true) => {
  const { isLoading, isError, data, isRefetching } = useQuery<EventImageInfo | null, Error>(
    ['eventImage', eventId, locationId],
    () => fetchEventImage(eventId, locationId),
    {
      enabled,
      cacheTime: 1800000, // 30 min ///
    }
  );

  return { isLoading, isError, data, isRefetching };
};

export default useEventImageQuery;
