import * as React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface WaveCurrentEventIndicatorProps {
  eventCount: number;
  currentEventIndex: number;
}

const WaveCurrentEventIndicator = ({ eventCount, currentEventIndex }: WaveCurrentEventIndicatorProps) => {
  const { colors } = useTheme();
  const size = 10;

  const renderIndicator = () => {
    const indicator: JSX.Element[] = [];

    for (let i = 0; i < eventCount; i++) {
      indicator.push(
        <View
          key={`event-indicator-${i}`}
          style={{
            width: size,
            height: size,
            marginHorizontal: 2,
            borderRadius: 10,
            backgroundColor: i === currentEventIndex ? colors.primary : '#333',
            borderColor: i === currentEventIndex ? colors.primary : '#fff',
          }}
        />
      );
    }

    return indicator;
  };

  return (
    <View
      style={{
        display: 'flex',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {renderIndicator()}
    </View>
  );
};

export default WaveCurrentEventIndicator;
