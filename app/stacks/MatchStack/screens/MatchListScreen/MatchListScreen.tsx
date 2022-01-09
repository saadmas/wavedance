import firebase from 'firebase';
import * as React from 'react';
import { FirebaseNode } from '../../../../firebase/keys';
import { getLastMessageSent, getPhotoUri, getUserBasicInfo } from '../../../../firebase/queries';
import { ChatMessage } from '../../../../firebase/types';
import { getFirebasePath, getMatchedUserId } from '../../../../firebase/utils';
import { ResponseStatus } from '../../../../state/enums/responseStatus';
import MatchList from './components/MatchList/MatchList';

export interface MatchListItem {
  chatId: string;
  name: string;
  photoUri?: string;
  lastMessageSent?: ChatMessage;
}

const MatchListScreen = () => {
  let matchListRef: firebase.database.Reference | undefined;

  const [matchListItems, setMatchListItems] = React.useState<MatchListItem[]>([]);
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading); ///

  React.useEffect(() => {
    const getMatchChats = async () => {
      //f const uid = firebase.auth().currentUser?.uid ?? 'foo';
      const uid = 'foo';
      const path = getFirebasePath(FirebaseNode.UserChats, uid);

      matchListRef = firebase.database().ref(path);

      matchListRef.on('value', async snapshot => {
        const value = snapshot.val();

        console.log(value);

        if (!value) {
          setResponseStatus(ResponseStatus.Success);
          return;
        }

        const chatIds = new Set(Object.keys(value));
        console.log(chatIds); ///
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
      });
    };

    const disconnectRef = () => {
      matchListRef?.off();
    };

    getMatchChats();
    return disconnectRef;
  }, []);

  return <MatchList listItems={matchListItems} />;
};

export default MatchListScreen;
