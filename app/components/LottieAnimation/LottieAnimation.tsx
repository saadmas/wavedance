import * as React from 'react';
import LottieView from 'lottie-react-native';
import { StyleProp, ViewStyle } from 'react-native';

interface LottieAnimationProps {
  shouldLoop: boolean;
  source: string;
  finalFramePosition: number;
  speed?: number;
  style?: StyleProp<ViewStyle>;
}
const LottieAnimation = ({ source, finalFramePosition, style, shouldLoop, speed }: LottieAnimationProps) => {
  const [framePosition, setFramePosition] = React.useState<number | undefined>(undefined);

  const onAnimationFinish = () => {
    setFramePosition(finalFramePosition);
  };

  return (
    <LottieView
      source={source}
      autoPlay={true}
      speed={speed}
      progress={framePosition}
      onAnimationFinish={onAnimationFinish}
      loop={shouldLoop}
      style={style}
    />
  );
};

export default LottieAnimation;
