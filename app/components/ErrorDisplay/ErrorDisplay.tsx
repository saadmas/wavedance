import * as React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import LottieAnimation from '../LottieAnimation/LottieAnimation';

interface ErrorDisplayProps {}

const ErrorDisplay = ({}: ErrorDisplayProps) => {
  const { fonts } = useTheme();

  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
      <Text style={{ fontFamily: fonts.thin.fontFamily, fontSize: 18, letterSpacing: 0.8 }}>
        Whoops, something went wrong!
      </Text>
      <LottieAnimation
        source={require(`../../../assets/animations/sad-heart.json`)}
        finalFramePosition={1}
        shouldLoop={false}
        style={{
          width: 150,
          height: 150,
          marginTop: 5,
        }}
      />
    </View>
  );
};

export default ErrorDisplay;
