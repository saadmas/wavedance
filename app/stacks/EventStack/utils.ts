import firebase from 'firebase';
import { PromptAnswer } from '../../components/PromptsManager/PromptsManager';
import { EdmTrainEvent } from '../../edmTrain/types';
import { FavoriteEvent } from '../../firebase/types';
import { getEventMembersPath, getUserEventPromptsPath, getUserFavoriteEventsPath } from '../../firebase/utils';
import { EventPrompt } from '../../state/enums/eventPrompt';
import { PromptSelectionType } from '../../state/enums/promptSelectionType';
import { getPromptsToStore } from '../../utils/prompts/prompt.util';

export const saveUserEvent = async (uid: string, event: EdmTrainEvent) => {
  const { id, createdDate } = event;
  const favoriteEvent: FavoriteEvent = { createdDate };
  const path = getUserFavoriteEventsPath(uid, id);

  try {
    await firebase.database().ref(path).set(favoriteEvent);
  } catch (e) {
    console.error('saveEvent failed');
    console.error(e);
    console.error(`uid: ${uid}`);
  }
};

export const removeUserEvent = async (uid: string, eventId: number) => {
  const path = getUserFavoriteEventsPath(uid, eventId);

  try {
    await firebase.database().ref(path).remove();
  } catch (e) {
    console.error('removeUserEvent failed');
    console.error(e);
    console.error(`uid: ${uid}`);
  }
};

export const saveUserUnderEventMembers = async (uid: string, eventId: number) => {
  const path = getEventMembersPath(eventId, uid);

  try {
    await firebase.database().ref(path).set(true);
  } catch (e) {
    console.error('saveUserUnderEventMembers failed');
    console.error(e);
    console.error(`eventId ${eventId}`);
    console.error(`uid: ${uid}`);
  }
};

export const removeUserFromEventMembers = async (uid: string, eventId: number) => {
  const path = getEventMembersPath(eventId, uid);

  try {
    await firebase.database().ref(path).remove();
  } catch (e) {
    console.error('removeUserFromEventMembers failed');
    console.error(e);
    console.error(`eventId ${eventId}`);
    console.error(`uid: ${uid}`);
  }
};

export const getUserEventPrompts = async (uid: string, eventId: number) => {
  const path = getUserEventPromptsPath(uid, eventId);

  try {
    const snapshot = await firebase.database().ref(path).once('value');
    const prompts = snapshot.val() ?? undefined;
    return prompts;
  } catch (e) {
    console.error('getUserEventPrompts failed');
    console.error(e);
    console.error(`eventId ${eventId}`);
    console.error(`uid: ${uid}`);
  }
};

export const saveUserEventPrompts = async (
  uid: string,
  eventId: number,
  filledPrompts?: Map<EventPrompt, PromptAnswer>
) => {
  if (!filledPrompts) {
    return;
  }

  const path = getUserEventPromptsPath(uid, eventId);
  const promptsToStore = getPromptsToStore(PromptSelectionType.Event, filledPrompts);

  try {
    await firebase.database().ref(path).set(promptsToStore);
  } catch (e) {
    console.error('saveUserEventPrompts failed');
    console.error(e);
    console.error(`eventId ${eventId}`);
    console.error(`uid: ${uid}`);
    console.error(`filledPrompts: ${promptsToStore}`);
  }
};

export const removeUserEventPrompts = async (uid: string, eventId: number) => {
  const path = getUserEventPromptsPath(uid, eventId);

  try {
    await firebase.database().ref(path).remove();
  } catch (e) {
    console.error('removeUserEventPrompts failed');
    console.error(e);
    console.error(`eventId ${eventId}`);
    console.error(`uid: ${uid}`);
  }
};
