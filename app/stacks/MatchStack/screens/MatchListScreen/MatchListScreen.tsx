import firebase from 'firebase';
import * as React from 'react';
import { FirebaseNode } from '../../../../firebase/keys';
import { getLastMessageSent, getPhotoUri, getUserBasicInfo } from '../../../../firebase/queries';
import { ChatMessage } from '../../../../firebase/types';
import { getFirebasePath, getMatchedUserId } from '../../../../firebase/utils';
import { ResponseStatus } from '../../../../state/enums/responseStatus';

interface MatchListItem {
  name: string;
  photoUri?: string;
  lastMessageSent?: ChatMessage;
}

const MatchListScreen = () => {
  const [matchListItems, setMatchListItems] = React.useState<MatchListItem[]>([]);
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading);

  React.useEffect(() => {
    let matchListRef: firebase.database.Reference | undefined;

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

          const listItem: MatchListItem = { lastMessageSent, name, photoUri };
          listItems.push(listItem);
        }

        setMatchListItems(listItems);
      });
    };

    const disconnectRef = () => {
      matchListRef?.off();
    };

    getMatchChats();
    return disconnectRef();
  }, []);

  return null;
};

export default MatchListScreen;
