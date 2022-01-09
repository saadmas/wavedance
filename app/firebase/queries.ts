import firebase from 'firebase';
import { FirebaseNode } from './keys';
import { ChatMessage } from './types';
import {
  getFirebasePath,
  getUserBasicInfoPath,
  getUserBlocksPath,
  getUserEventIgnoresPath,
  getUserWaveIgnoresPath,
  getUserPhotosPath,
  getUserWavesSentPath,
  getUserChatsPath,
  getLastMessageSentPath,
} from './utils';

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
    const snapshot = await firebase.database().ref(path).once('value');
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

export const getUserBlockedIds = async (uid: string): Promise<Set<string>> => {
  try {
    const path = getUserBlocksPath(uid);
    const snapshot = await firebase.database().ref(path).once('value');
    const value = snapshot.val();
    if (value) {
      const userBlockedIds = new Set(Object.keys(value));
      return userBlockedIds;
    }
  } catch (e) {
    console.error('getUserBlockedIds failed');
    console.error(e);
    console.error(`uid: ${uid}`);
  }

  return new Set();
};

export const getUserIgnoredIds = async (uid: string, eventId: number): Promise<Set<string>> => {
  try {
    const path = getUserEventIgnoresPath(uid, eventId);
    const snapshot = await firebase.database().ref(path).once('value');
    const value = snapshot.val();
    if (value) {
      const ignoredUserIds = new Set(Object.keys(value));
      return ignoredUserIds;
    }
  } catch (e) {
    console.error('getUserIgnoredIds failed');
    console.error(e);
    console.error(`uid: ${uid}`);
    console.error(`eventId: ${eventId}`);
  }

  return new Set();
};

export const getUserWavedIds = async (uid: string, eventId: number): Promise<Set<string>> => {
  try {
    const path = getUserWavesSentPath(uid, eventId);
    const snapshot = await firebase.database().ref(path).once('value');
    const value = snapshot.val();
    if (value) {
      const userWavedIds = new Set(Object.keys(value));
      return userWavedIds;
    }
  } catch (e) {
    console.error('getUserWavedIds failed');
    console.error(e);
    console.error(`uid: ${uid}`);
    console.error(`eventId: ${eventId}`);
  }

  return new Set();
};

export const getAllUserWavedIds = async (uid: string): Promise<Set<string>> => {
  const allUserWavedIds = new Set<string>();

  try {
    const path = getFirebasePath(FirebaseNode.UserWavesSent, uid);
    const snapshot = await firebase.database().ref(path).once('value');
    const value = snapshot.val();

    if (!value) {
      return allUserWavedIds;
    }

    const wavesByEvent = Object.values(value);

    for (const eventWaves of wavesByEvent) {
      const eventWavedIds = Object.keys(eventWaves as any);

      eventWavedIds.forEach(wavedId => {
        allUserWavedIds.add(wavedId);
      });
    }
  } catch (e) {
    console.error('getAllUserWavedIds failed');
    console.error(e);
    console.error(`uid: ${uid}`);
  }

  return allUserWavedIds;
};

export const getUserWaveIgnoreIds = async (uid: string): Promise<Set<string>> => {
  try {
    const path = getUserWaveIgnoresPath(uid);
    const snapshot = await firebase.database().ref(path).once('value');
    const value = snapshot.val();
    if (value) {
      const userMatchIgnoresIds = new Set(Object.keys(value));
      return userMatchIgnoresIds;
    }
  } catch (e) {
    console.error('getUserWaveIgnoreIds failed');
    console.error(e);
    console.error(`uid: ${uid}`);
  }

  return new Set();
};

export const doesChatAlreadyExist = async (uid: string, chatId: string): Promise<boolean> => {
  const path = getUserChatsPath(uid, chatId);
  let chatExists = false;

  try {
    const snapshot = await firebase.database().ref(path).get();
    const value = snapshot.val();
    if (value) {
      chatExists = true;
    }
  } catch (e) {
    console.error('doesChatAlreadyExist failed');
    console.error(e);
    console.error(`uid: ${uid}`);
    console.error(`chatId: ${chatId}`);
  }

  return chatExists;
};

export const getLastMessageSent = async (chatId: string): Promise<ChatMessage | undefined> => {
  try {
    const path = getLastMessageSentPath(chatId);
    const snapshot = await firebase.database().ref(path).once('value');
    const value = snapshot.val();
    if (value) {
      return value;
    }
  } catch (e) {
    console.error('getLastMessageSent failed');
    console.error(e);
    console.error(`chatId: ${chatId}`);
  }
};
