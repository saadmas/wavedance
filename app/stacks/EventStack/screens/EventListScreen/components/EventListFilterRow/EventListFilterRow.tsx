import * as React from 'react';
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { EdmTrainLocation } from '../../../../../../edmTrain/types';
import { getLocationDisplayText } from '../../../../../../edmTrain/utils';

interface EventListFilterRowProps {
  location?: EdmTrainLocation;
  isFavoriteList: boolean;
  onFavoriteSwitch: () => void;
  onLocationClick: () => void;
}

const EventListFilterRow = ({
  onFavoriteSwitch,
  isFavoriteList,
  onLocationClick,
  location,
}: EventListFilterRowProps) => {
  const { colors } = useTheme();

  const renderLocationButton = (): React.ReactNode => {
    // if (!location) {
    //   return;
    // } ///

    const locationText = location ? getLocationDisplayText(location) : 'Foo';

    return (
      <Button
        mode="outlined"
        style={{ flex: 1, marginLeft: 10, borderRadius: 40, borderColor: colors.text }}
        labelStyle={{ fontSize: 10 }}
        compact={true}
        uppercase={false}
        onPress={onLocationClick}
        theme={{ colors: { primary: colors.text } }}
        icon="map-marker-outline"
      >
        {locationText}
      </Button>
    );
  };

  return (
    <View
      style={{
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Button
        mode={isFavoriteList ? 'contained' : 'outlined'}
        style={{ width: 100, borderRadius: 40, borderColor: isFavoriteList ? undefined : colors.text }}
        labelStyle={{ fontSize: 10 }}
        compact={true}
        uppercase={false}
        onPress={onFavoriteSwitch}
        theme={isFavoriteList ? undefined : { colors: { primary: colors.text } }}
        icon="heart-outline"
      >
        Favorites
      </Button>
      {renderLocationButton()}
    </View>
  );
};

export default EventListFilterRow;
