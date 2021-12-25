import * as React from 'react';
import { View } from 'react-native';
import { Waves } from '../../WaveListScreen';

interface WaveListProps {
  waves: Waves;
}

const WaveList = ({ waves }: WaveListProps) => {
  return null;
  // const renderProflies = () => {
  //   const profiles = waves.forEach((event, userId) => {
  //     return <View></View>;
  //   });
  // };

  // return <View>{renderProflies()}</View>;
};

export default WaveList;
