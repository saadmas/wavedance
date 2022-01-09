import firebase from 'firebase';
import { doesChatAlreadyExist } from './queries';
import { ChatMessage } from './types';
import { getChatMessagesPath, getLastMessageSentPath, getUserChatsPath } from './utils';

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

export const addChatMessage = async (chatId: string, chatMessage: ChatMessage) => {
  const path = getChatMessagesPath(chatId);

  try {
    await firebase.database().ref(path).push(chatMessage);
  } catch (e) {
    console.error('addChatMessage failed');
    console.error(e);
    console.error(`chatId: ${chatId}`);
    console.error(`chatMessage: ${chatMessage}`);
  }
};

export const updateLastMessageSent = async (chatId: string, chatMessage: ChatMessage) => {
  const path = getLastMessageSentPath(chatId);

  try {
    await firebase.database().ref(path).set(chatMessage);
  } catch (e) {
    console.error('updateLastMessageSent failed');
    console.error(e);
    console.error(`chatId: ${chatId}`);
    console.error(`chatMessage: ${chatMessage}`);
  }
};
