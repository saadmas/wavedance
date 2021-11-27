import { FirebaseNode, UserPhotos } from './keys';

export const getFirebasePath = (...args: (string | undefined)[]): string => {
  const validArgs = args.filter(arg => !!arg);
  return validArgs.join('/');
};

export const getUserPhotosPath = (uid: string) => {
  const path = getFirebasePath(FirebaseNode.UserPhotos, uid, UserPhotos.ProfilePhoto);
  return path;
};

export const getUserPromptsPath = (uid: string) => {
  const path = getFirebasePath(FirebaseNode.UserPrompts, uid);
  return path;
};

export const getUserAdditionalInfoPath = (uid: string) => {
  const path = getFirebasePath(FirebaseNode.UserAdditionalInfo, uid);
  return path;
};

export const getUseBasicInfoPath = (uid: string) => {
  const path = getFirebasePath(FirebaseNode.UserBasicInfo, uid);
  return path;
};

export const getUserFavoriteEventsPath = (uid: string, eventId?: number) => {
  const path = getFirebasePath(FirebaseNode.UserFavoriteEvents, uid, eventId?.toString());
  return path;
};

export const getEventMembersPath = (eventId: number, uid?: string) => {
  const path = getFirebasePath(FirebaseNode.EventMembers, eventId.toString(), uid);
  return path;
};

export const getUserEventPromptsPath = (uid: string, eventId: number) => {
  const path = getFirebasePath(FirebaseNode.UserEventPrompts, uid, eventId.toString());
  return path;
};
