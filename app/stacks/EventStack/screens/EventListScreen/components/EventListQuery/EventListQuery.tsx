import * as React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import LottieAnimation from '../../../../../../components/LottieAnimation/LottieAnimation';
import { useEventQuery } from '../../../../../../edmTrain/useEventQuery';
import EventList from '../EventList/EventList';

interface EventListQueryProps {
  searchText: string;
  locationId?: number;
}

const EventListQuery = ({ searchText, locationId }: EventListQueryProps) => {
  const { isLoading, isError, data } = useEventQuery(locationId ?? 70); ///
  const { fonts } = useTheme();
  const isFailure = data ? !data.success : false;

  if (isLoading) {
    //* too fast ?
    return (
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
        <LottieAnimation
          source={require(`../../../../../../../assets/animations/loading-hand.json`)}
          finalFramePosition={1}
          shouldLoop={true}
        />
      </View>
    );
  }

  if (isError || isFailure) {
    /// test again
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
  }

  return <EventList events={data?.data ?? []} searchText={searchText} />;
};

export default EventListQuery;
