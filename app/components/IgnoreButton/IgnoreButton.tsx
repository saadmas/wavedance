import * as React from 'react';
import LottieInteractiveAnimation from '../LottieInteractiveAnimation/LottieInteractiveAnimation';
import * as Haptics from 'expo-haptics';

interface IgnoreButtonProps {
  onIgnore: () => void;
}

const IgnoreButton = ({ onIgnore }: IgnoreButtonProps) => {
  const [animationPlayerFlag, setAnimationPlayerFlag] = React.useState<number>(0);
  const size = 55;

  const onPress = () => {
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
