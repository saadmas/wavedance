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

export const getUserBasicInfoPath = (uid: string) => {
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

export const getUserBlocksPath = (uid: string) => {
  const path = getFirebasePath(FirebaseNode.UserBlocks, uid);
  return path;
};

export const getUserWaveIgnoresPath = (uid: string, userToIgnoreId?: string) => {
  const path = getFirebasePath(FirebaseNode.UserWaveIgnores, uid, userToIgnoreId);
  return path;
};

export const getUserWavesSentPath = (sentByUid: string, eventId: number, receivedByUid?: string) => {
  const path = getFirebasePath(FirebaseNode.UserWavesSent, sentByUid, eventId.toString(), receivedByUid);
  return path;
};

export const getUserWavesReceivedPath = (receivedByUid: string, sentById?: string, eventId?: number) => {
  const path = getFirebasePath(FirebaseNode.UserWavesReceived, receivedByUid, sentById, eventId?.toString());
  return path;
};

export const getUserEventIgnoresPath = (ignorerUid: string, eventId: number, ignoredUid?: string) => {
  const path = getFirebasePath(FirebaseNode.UserEventIgnores, ignorerUid, eventId.toString(), ignoredUid);
  return path;
};
