import * as React from 'react';
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import NoDataDisplay from '../../../../../../components/NoDataDisplay/NoDataDisplay';

interface EventCarouselEndProps {}

const EventCarouselEnd = ({}: EventCarouselEndProps) => {
  const { colors } = useTheme();

  const onPress = () => {
    ///
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <NoDataDisplay
        noDataText="You've viewed all members interested in this event"
        shouldLoop={false}
        source={require('../../../../../../../assets/animations/purple-success.json')}
      />
      <Button
        mode="outlined"
        icon="refresh"
        style={{ width: '80%', borderRadius: 40, marginTop: 50, borderColor: colors.text }}
        labelStyle={{ fontSize: 12, color: colors.text }}
        // compact={true}
        uppercase={false}
        onPress={onPress}
        theme={{ colors: { primary: colors.text } }}
      >
        Reset viewed members
      </Button>
    </View>
  );
};

export default EventCarouselEnd;
