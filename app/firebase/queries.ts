import firebase from 'firebase';
import { getUserBasicInfoPath, getUserPhotosPath } from './utils';

export const getPhotoUri = async (userId: string): Promise<string | undefined> => {
  let photoUri: string | undefined;
  const path = getUserPhotosPath(userId);

  try {
    const storedPhotoUri = await firebase.storage().ref(`${path}.jpg`).getDownloadURL();
    if (storedPhotoUri) {
      photoUri = storedPhotoUri;
    }
  } catch (e) {
    console.error('getPhotoUri failed');
    console.error(e);
    console.error(`userId: ${userId}`);
  }

  return photoUri;
};

export const getUserBasicInfo = async (userId: string) => {
  try {
    const path = getUserBasicInfoPath(userId);
    const snapshot = await firebase.database().ref(path).get();
    const value = snapshot.val();
    if (value) {
      return value;
    }
  } catch (e) {
    console.error('getUserBasicInfo failed');
    console.error(e);
    console.error(`userId: ${userId}`);
  }
};
