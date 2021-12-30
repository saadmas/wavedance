import * as React from 'react';
import LottieInteractiveAnimation from '../LottieInteractiveAnimation/LottieInteractiveAnimation';
import * as Haptics from 'expo-haptics';
import firebase from 'firebase';
import { EdmTrainEvent } from '../../edmTrain/types';
import { getChatId, getUserWavesReceivedPath, getUserWavesSentPath } from '../../firebase/utils';
import LottieAnimation from '../LottieAnimation/LottieAnimation';
import Dialog from '../Dialog/Dialog';
import { createChat } from '../../firebase/mutations';

interface WaveButtonProps {
  waveReceivedByUid: string;
  name: string;
  event: EdmTrainEvent;
  onWave: () => void;
}

const WaveButton = ({ onWave, event, waveReceivedByUid, name }: WaveButtonProps) => {
  const [animationPlayerFlag, setAnimationPlayerFlag] = React.useState<number>(0);
  const [isMatchDialogOpen, setIsMatchDialogOpen] = React.useState<boolean>(false);
  const [shouldPlayMatchAnimation, setShouldPlayMatchAnimation] = React.useState<boolean>(false);

  const size = 55;

  const sendWave = async (waveSentByUid: string) => {
    try {
      const path = getUserWavesSentPath(waveSentByUid, event.id, waveReceivedByUid);
      await firebase.database().ref(path).set(true);
    } catch (e) {
      console.error('sendWave failed');
      console.error(e);
      console.error(`waveSentByUid: ${waveSentByUid}`);
      console.error(`waveReceivedByUid: ${waveReceivedByUid}`);
      console.error(`event.id: ${event.id}`);
    }
  };

  const isMatch = async (currentUserId: string) => {
    try {
      const path = getUserWavesReceivedPath(currentUserId, waveReceivedByUid, event.id);
      const snapshot = await firebase.database().ref(path).once('value');
      return !!snapshot.val();
    } catch (e) {
      console.error('isMatch failed');
      console.error(e);
      console.error(`currentUserId: ${currentUserId}`);
      console.error(`waveReceivedByUid: ${waveReceivedByUid}`);
      console.error(`event.id: ${event.id}`);
    }
  };

  const receiveWave = async (waveSentByUid: string) => {
    try {
      const path = getUserWavesReceivedPath(waveReceivedByUid, waveSentByUid, event.id);
      await firebase.database().ref(path).set(event);
    } catch (e) {
      console.error('receiveWave failed');
      console.error(e);
      console.error(`waveSentByUid: ${waveSentByUid}`);
      console.error(`waveReceivedByUid: ${waveReceivedByUid}`);
      console.error(`event.id: ${event.id}`);
    }
  };

  const onPress = async () => {
    setAnimationPlayerFlag(prev => prev + 1);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // //f const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const waveSentByUid = 'foo';
    receiveWave(waveSentByUid);
    sendWave(waveSentByUid);

    const usersHaveMatched = await isMatch(waveSentByUid);
    if (!usersHaveMatched) {
      onWave();
      return;
    }

    const chatId = getChatId(waveSentByUid, waveReceivedByUid);
    await createChat(waveSentByUid, chatId);
    //* should we add to last message sent node ??? depends on how it would look (check after building chat list)

    setShouldPlayMatchAnimation(true);
    await new Promise(r => setTimeout(r, 800)); // To let the heart-favorite animation play out nicely :)
    setIsMatchDialogOpen(true);
  };

  const closeDialog = () => {
    onWave();
    setIsMatchDialogOpen(false);
    setShouldPlayMatchAnimation(false);
  };

  const goToChat = () => {
    closeDialog();
    ///
  };

  return (
    <>
      {shouldPlayMatchAnimation && (
        <LottieAnimation
          source={require(`../../../assets/animations/confetti.json`)}
          finalFramePosition={1}
          shouldLoop={false}
          speed={2}
          style={{
            width: '100%',
            height: '100%',
            zIndex: 999999999,
            position: 'absolute',
            top: 0,
          }}
        />
      )}
      <Dialog
        isVisible={isMatchDialogOpen}
        title="It's a match!"
        primaryButtonText="Go to chat"
        description={`You and ${name.split(' ')[0]} are a chat away from dancin' together`}
        onPrimaryAction={goToChat}
        onDismiss={closeDialog}
        secondaryButtonText="Later"
      />
      <LottieInteractiveAnimation
        animationPlayerFlag={animationPlayerFlag}
        source={require(`../../../assets/animations/hand-wave.json`)}
        isStaticFramePosition={true}
        onPress={onPress}
        style={{
          width: size,
          height: size,
          position: 'absolute',
          zIndex: 1000,
          bottom: 2,
          right: 2,
          transform: [{ rotate: '-15deg' }],
        }}
        speed={2.5}
      />
    </>
  );
};

export default WaveButton;
