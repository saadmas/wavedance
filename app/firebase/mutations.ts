import firebase from 'firebase';
import { doesChatAlreadyExist } from './queries';
import { getUserChatsPath } from './utils';

export const createChat = async (uid: string, chatId: string) => {
  const chatAlreadyExists = await doesChatAlreadyExist(uid, chatId);

  if (chatAlreadyExists) {
    return;
  }

  const path = getUserChatsPath(uid, chatId);

  try {
    await firebase.database().ref(path).set(true);
  } catch (e) {
    console.error('createChat failed');
    console.error(e);
    console.error(`chatId: ${chatId}`);
    console.error(`uid: ${uid}`);
  }
};
