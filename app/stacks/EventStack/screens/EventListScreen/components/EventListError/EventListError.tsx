import * as React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import LottieAnimation from '../../../../../../components/LottieAnimation/LottieAnimation';

interface EventListErrorProps {}

const EventListError = ({}: EventListErrorProps) => {
  const { fonts } = useTheme();

  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
      <Text style={{ fontFamily: fonts.thin.fontFamily, fontSize: 18, letterSpacing: 0.8 }}>
        Oops, something went wrong
      </Text>
      <LottieAnimation
        source={require(`../../../../../../../assets/animations/broken-branch.json`)}
        finalFramePosition={1}
        shouldLoop={false}
        style={{
          width: 100,
          height: 100,
          marginTop: 5,
        }}
      />
    </View>
  );
};

export default EventListError;
