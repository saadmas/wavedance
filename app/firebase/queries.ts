import firebase from 'firebase';
import { getUserPhotosPath } from './utils';

export const getPhotoUri = async (userId: string): Promise<string | undefined> => {
  let photoUri: string | undefined;
  const path = getUserPhotosPath(userId);

  try {
    const storedPhotoUri = await firebase.storage().ref(`${path}.jpg`).getDownloadURL();
    if (storedPhotoUri) {
      photoUri = storedPhotoUri;
    }
  } catch (e) {
    console.error('fetchPhotoUri failed');
    console.error(e);
    console.error(`userId: ${userId}`);
  }

  return photoUri;
};
