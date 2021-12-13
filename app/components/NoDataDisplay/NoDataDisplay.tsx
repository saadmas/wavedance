import * as React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import LottieAnimation from '../LottieAnimation/LottieAnimation';

interface NoDataDisplayProps {
  noDataText: string;
}

const NoDataDisplay = ({ noDataText }: NoDataDisplayProps) => {
  const { fonts } = useTheme();

  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
      <Text style={{ fontFamily: fonts.thin.fontFamily, fontSize: 18, letterSpacing: 0.8 }}>{noDataText}</Text>
      <LottieAnimation
        source={require(`../../../assets/animations/tumbleweed-rolling.json`)}
        finalFramePosition={1}
        shouldLoop={true}
        style={{
          width: 150,
          height: 150,
          marginTop: 5,
        }}
      />
    </View>
  );
};

export default NoDataDisplay;
