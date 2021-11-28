import firebase from 'firebase';
import { EdmTrainEvent } from '../../edmTrain/types';
import { FavoriteEvent } from '../../firebase/types';
import { getEventMembersPath, getUserEventPromptsPath, getUserFavoriteEventsPath } from '../../firebase/utils';
import { EventPrompt } from '../../state/enums/eventPrompt';
import { PromptSelectionType } from '../../state/enums/promptSelectionType';
import { getPromptsToStore } from '../../utils/prompts/prompt.util';

export const saveEvent = async (uid: string, event: EdmTrainEvent) => {
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

export const saveUserEventPrompts = async (uid: string, eventId: number, filledPrompts?: Map<EventPrompt, string>) => {
  if (!filledPrompts) {
    return;
  }

  const path = getUserEventPromptsPath(uid, eventId);
  const promptsToStore = getPromptsToStore(PromptSelectionType.Event, filledPrompts);

  try {
    await firebase.database().ref(path).set(promptsToStore);
  } catch (e) {
    console.error('saveUserUnderEventMembers failed');
    console.error(e);
    console.error(`eventId ${eventId}`);
    console.error(`uid: ${uid}`);
    console.error(`filledPrompts: ${promptsToStore}`);
  }
};
