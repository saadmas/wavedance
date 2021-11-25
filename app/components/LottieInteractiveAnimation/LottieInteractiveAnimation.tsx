import * as React from 'react';
import LottieView from 'lottie-react-native';
import { StyleProp, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

enum FramePosition {
  Start = 0,
  End = 1,
}

interface LottieInteractiveAnimationProps {
  source: string;
  onPress: () => void;
  initialFramePosition?: FramePosition;
  style?: StyleProp<ViewStyle>;
}
const LottieInteractiveAnimation = ({
  source,
  style,
  onPress,
  initialFramePosition,
}: LottieInteractiveAnimationProps) => {
  const animationRef = React.useRef<AnimatedLottieView>(null);
  const [framePosition, setFramePosition] = React.useState<number | undefined>(initialFramePosition);

  const playAnimation = () => {
    if (framePosition === 1) {
      animationRef.current?.play(FramePosition.End, FramePosition.Start);
      return;
    }
    animationRef.current?.play();
  };

  const onAnimationViewPress = () => {
    playAnimation();
    onPress();
  };

  const onAnimationFinish = () => {
    setFramePosition(prevPosition => (prevPosition === FramePosition.Start ? FramePosition.End : FramePosition.Start));
  };

  return (
    <TouchableWithoutFeedback onPress={onAnimationViewPress}>
      <LottieView
        ref={animationRef}
        source={source}
        autoPlay={false}
        progress={framePosition}
        onAnimationFinish={onAnimationFinish}
        loop={false}
        style={style}
      />
    </TouchableWithoutFeedback>
  );
};

export default LottieInteractiveAnimation;
