import * as React from 'react';
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

interface EventListFilterRowProps {
  isFavoriteList: boolean;
  onFavoriteSwitch: () => void;
}

const EventListFilterRow = ({ onFavoriteSwitch, isFavoriteList }: EventListFilterRowProps) => {
  const { colors } = useTheme();

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
      <Button
        mode="outlined"
        style={{ flex: 1, marginLeft: 10, borderRadius: 40, borderColor: colors.text }}
        labelStyle={{ fontSize: 10 }}
        compact={true}
        uppercase={false}
        // onPress={onFavoriteSwitch}
        theme={{ colors: { primary: colors.text } }}
        icon="map-marker-outline"
      >
        Grand Rapids, MI
      </Button>
    </View>
  );
};

export default EventListFilterRow;
