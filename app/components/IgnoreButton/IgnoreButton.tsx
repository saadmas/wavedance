import * as React from 'react';
import LottieInteractiveAnimation from '../LottieInteractiveAnimation/LottieInteractiveAnimation';
import * as Haptics from 'expo-haptics';

interface IgnoreButtonProps {}

const IgnoreButton = ({}: IgnoreButtonProps) => {
  const [animationPlayerFlag, setAnimationPlayerFlag] = React.useState<number>(0);
  const size = 55;

  const onPress = () => {
    setAnimationPlayerFlag(prev => prev + 1);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  return (
    <LottieInteractiveAnimation
      animationPlayerFlag={animationPlayerFlag}
      source={require(`../../../assets/animations/ignore.json`)}
      onPress={onPress}
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
