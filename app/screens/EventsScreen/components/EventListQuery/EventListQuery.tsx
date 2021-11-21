import * as React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import LottieAnimation from '../../../../components/LottieAnimation/LottieAnimation';
import { useEventQuery } from '../../../../edmTrain/useEventQuery';
import EventList from '../EventList/EventList';

const EventListQuery = () => {
  const { isLoading, isError, data } = useEventQuery(70); ///
  const { fonts } = useTheme();
  const isFailure = data ? !data.success : false;

  if (isError || isFailure) {
    /// test again
    return (
      <View style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center', width: '100%' }}>
        <Text style={{ fontFamily: fonts.thin.fontFamily, fontSize: 18, letterSpacing: 0.8 }}>
          Oops, something went wrong
        </Text>
        <LottieAnimation
          source={require(`../../../../../assets/animations/broken-branch.json`)}
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
  }

  if (isLoading) {
    //* too fast ?
    return (
      <LottieAnimation
        source={require(`../../../../../assets/animations/loading-hand.json`)}
        finalFramePosition={1}
        shouldLoop={true}
      />
    );
  }

  const edmTrainEvents = data?.data;

  if (!edmTrainEvents?.length) {
    return (
      <View style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center', width: '100%' }}>
        <Text style={{ fontFamily: fonts.thin.fontFamily, fontSize: 18, letterSpacing: 0.8 }}>
          Bummer, no events found
        </Text>
        <LottieAnimation
          source={require(`../../../../../assets/animations/bummer.json`)}
          finalFramePosition={1}
          shouldLoop={true}
          style={{
            width: 200,
            height: 200,
            marginTop: 5,
          }}
        />
      </View>
    );
  }

  return <EventList events={edmTrainEvents} />;
};

export default EventListQuery;
