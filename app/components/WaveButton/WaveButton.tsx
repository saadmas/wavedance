import * as React from 'react';
import LottieInteractiveAnimation from '../LottieInteractiveAnimation/LottieInteractiveAnimation';
import * as Haptics from 'expo-haptics';
import firebase from 'firebase';

interface WaveButtonProps {
  onWave: () => void;
  eventId?: number;
}

const WaveButton = ({ onWave, eventId }: WaveButtonProps) => {
  const [animationPlayerFlag, setAnimationPlayerFlag] = React.useState<number>(0);
  const size = 55;

  const saveWaveUserWaveTo = async () => {
    try {
      const path = getUserWaveFr(userId, eventId);
      await firebase.database().ref(path).get();
    } catch (e) {
      console.error('saveWave failed');
      console.error(e);
      console.error(`userId: ${uid}`);
    }
  };

  const onPress = () => {
    if (eventId !== undefined) {
      // const uid = firebase.auth().currentUser?.uid ?? 'foo';
      const uid = 'foo';
    }

    setAnimationPlayerFlag(prev => prev + 1);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onWave();
  };

  return (
    <LottieInteractiveAnimation
      animationPlayerFlag={animationPlayerFlag}
      source={require(`../../../assets/animations/hand-wave.json`)}
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
      speed={2}
    />
  );
};

export default WaveButton;
