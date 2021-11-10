import * as React from 'react';
import LottieView from 'lottie-react-native';
import { StyleProp, ViewStyle } from 'react-native';

interface LottieAnimationProps {
  source: string;
  finalFramePosition: number;
  style?: StyleProp<ViewStyle>;
}
const LottieAnimation = ({ source, finalFramePosition, style }: LottieAnimationProps) => {
  const [framePosition, setFramePosition] = React.useState<number | undefined>(undefined);

  const onAnimationFinish = () => {
    setFramePosition(finalFramePosition);
  };

  return (
    <LottieView
      source={require('../../../assets/animations/user-animation.json')}
      autoPlay={true}
      progress={framePosition}
      onAnimationFinish={onAnimationFinish}
      loop={false}
      style={style}
    />
  );
};

export default LottieAnimation;
