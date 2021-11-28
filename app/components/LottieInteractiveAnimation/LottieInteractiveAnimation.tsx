import * as React from 'react';
import LottieView from 'lottie-react-native';
import { StyleProp, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

export enum FramePosition {
  Start = 0,
  End = 1,
}

interface LottieInteractiveAnimationProps {
  source: string;
  animationPlayerFlag: number;
  onPress: () => void;
  initialFramePosition?: FramePosition;
  speed?: number;
  style?: StyleProp<ViewStyle>;
}

const LottieInteractiveAnimation = ({
  source,
  style,
  onPress,
  initialFramePosition,
  speed,
  animationPlayerFlag,
}: LottieInteractiveAnimationProps) => {
  const animationRef = React.useRef<AnimatedLottieView>(null);
  const [framePosition, setFramePosition] = React.useState<FramePosition>(initialFramePosition ?? FramePosition.Start);

  React.useEffect(() => {
    const playAnimation = () => {
      if (framePosition === FramePosition.End) {
        animationRef.current?.play(FramePosition.End, FramePosition.Start);
        return;
      }
      animationRef.current?.play();
    };

    if (animationPlayerFlag) {
      playAnimation();
    }
  }, [animationPlayerFlag]);

  const onAnimationViewPress = () => {
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
        speed={speed}
        style={style}
      />
    </TouchableWithoutFeedback>
  );
};

export default LottieInteractiveAnimation;
