import { FirebaseNode, UserPhotos } from './keys';

export const getFirebasePath = (...args: string[]): string => {
  return args.join('/');
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

export const getUserFavoriteEventsPath = (uid: string, locationId: number) => {
  const path = getFirebasePath(FirebaseNode.UserFavoriteEvents, uid, locationId.toString());
  return path;
};

export const getEventMembersPath = (eventId: number) => {
  const path = getFirebasePath(FirebaseNode.EventMembers, eventId.toString());
  return path;
};

export const getUserEventPromptsPath = (uid: string, eventId: number) => {
  const path = getFirebasePath(FirebaseNode.UserEventPrompts, uid, eventId.toString());
  return path;
};
