import * as React from 'react';
import LottieInteractiveAnimation, { FramePosition } from '../LottieInteractiveAnimation/LottieInteractiveAnimation';
import * as Haptics from 'expo-haptics';
import firebase from 'firebase';
import { EdmTrainEvent } from '../../edmTrain/types';
import { getUserWavesReceivedPath, getUserWavesSentPath } from '../../firebase/utils';

interface WaveButtonProps {
  waveReceivedByUid: string;
  event: EdmTrainEvent;
  onWave: () => void;
}

const WaveButton = ({ onWave, event, waveReceivedByUid }: WaveButtonProps) => {
  const [animationPlayerFlag, setAnimationPlayerFlag] = React.useState<number>(0);
  const size = 55;

  const sendWave = async (waveSentByUid: string) => {
    try {
      const path = getUserWavesSentPath(waveSentByUid, waveReceivedByUid, event.id);
      await firebase.database().ref(path).set(true);
    } catch (e) {
      console.error('sendWave failed');
      console.error(e);
      console.error(`waveSentByUid: ${waveSentByUid}`);
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

  const onPress = () => {
    setAnimationPlayerFlag(prev => prev + 1);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const waveSentByUid = 'foo';
    receiveWave(waveSentByUid);
    sendWave(waveSentByUid);

    onWave();
  };

  return (
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
        bottom: 20,
        right: 2,
        transform: [{ rotate: '-15deg' }],
      }}
      speed={2.5}
    />
  );
};

export default WaveButton;
