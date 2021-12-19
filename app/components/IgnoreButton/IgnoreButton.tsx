import * as React from 'react';
import LottieInteractiveAnimation from '../LottieInteractiveAnimation/LottieInteractiveAnimation';
import * as Haptics from 'expo-haptics';
import firebase from 'firebase';
import { getUserEventIgnoresPath } from '../../firebase/utils';

interface IgnoreButtonProps {
  userToIgnoreId: string;
  eventId: number;
  onIgnore: () => void;
}

const IgnoreButton = ({ onIgnore, userToIgnoreId, eventId }: IgnoreButtonProps) => {
  const [animationPlayerFlag, setAnimationPlayerFlag] = React.useState<number>(0);
  const size = 55;

  const ignoreUser = async () => {
    //f const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const ignorerId = 'foo';
    const path = getUserEventIgnoresPath(ignorerId, userToIgnoreId, eventId);

    try {
      await firebase.database().ref(path).set(true);
    } catch (e) {
      console.error('ignoreUser failed');
      console.error(e);
      console.error(`userToIgnoreId: ${userToIgnoreId}`);
      console.error(`ignorerId: ${ignorerId}`);
      console.error(`eventId: ${eventId}`);
    }
  };

  const onPress = () => {
    ignoreUser();
    setAnimationPlayerFlag(prev => prev + 1);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    onIgnore();
  };

  return (
    <LottieInteractiveAnimation
      animationPlayerFlag={animationPlayerFlag}
      source={require(`../../../assets/animations/ignore.json`)}
      onPress={onPress}
      isStaticFramePosition={true}
      style={{
        width: size,
        height: size,
        position: 'absolute',
        zIndex: 1000,
        bottom: 18,
        left: 5,
      }}
      speed={2}
    />
  );
};

export default IgnoreButton;
