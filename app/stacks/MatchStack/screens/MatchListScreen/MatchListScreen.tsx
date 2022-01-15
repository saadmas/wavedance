import firebase from 'firebase';
import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import ErrorDisplay from '../../../../components/ErrorDisplay/ErrorDisplay';
import { FirebaseNode } from '../../../../firebase/keys';
import { getLastMessageSent, getPhotoUri, getUserBasicInfo } from '../../../../firebase/queries';
import { LastMessageSent } from '../../../../firebase/types';
import { getFirebasePath, getMatchedUserId } from '../../../../firebase/utils';
import { ResponseStatus } from '../../../../state/enums/responseStatus';
import MatchList from './components/MatchList/MatchList';

export interface MatchListItem {
  chatId: string;
  name: string;
  photoUri?: string;
  lastMessageSent?: LastMessageSent;
}

const MatchListScreen = () => {
  let matchListRef: firebase.database.Reference | undefined;

  const [matchListItems, setMatchListItems] = React.useState<MatchListItem[]>([]);
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading);

  React.useEffect(() => {
    const getMatchChats = async () => {
      //f const uid = firebase.auth().currentUser?.uid ?? 'foo';
      const uid = 'foo';
      const path = getFirebasePath(FirebaseNode.UserChats, uid);

      matchListRef = firebase.database().ref(path);

      matchListRef.on('value', async snapshot => {
        const value = snapshot.val();

        if (!value) {
          setResponseStatus(ResponseStatus.Success);
          return;
        }

        const chatIds = new Set(Object.keys(value));
        const listItems: MatchListItem[] = [];

        for (const chatId of chatIds) {
          const matchedUserId = getMatchedUserId(chatId, uid);

          if (!matchedUserId) {
            continue;
          }

          const photoUri = await getPhotoUri(matchedUserId);
          const lastMessageSent = await getLastMessageSent(chatId);

          const basicInfo = await getUserBasicInfo(matchedUserId);
          const name = basicInfo?.name ?? '';

          const listItem: MatchListItem = { lastMessageSent, name, photoUri, chatId };
          listItems.push(listItem);
        }

        setMatchListItems(listItems);
        setResponseStatus(ResponseStatus.Success);
      });
    };

    const disconnectRef = () => {
      matchListRef?.off();
    };

    getMatchChats();
    return disconnectRef;
  }, []);

  if (responseStatus === ResponseStatus.Loading) {
    return <ActivityIndicator style={{ height: '90%' }} size={60} />;
  }

  if (responseStatus === ResponseStatus.Error) {
    return <ErrorDisplay />;
  }

  return <MatchList listItems={matchListItems} />;
};

export default MatchListScreen;
