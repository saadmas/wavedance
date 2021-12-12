import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';
import LottieAnimation from '../../../../../../components/LottieAnimation/LottieAnimation';
import { eventCardImageHeight } from '../EventImage/EventImage';

interface EventListLoadingSkeletonProps {}

const EventListLoadingSkeleton = ({}: EventListLoadingSkeletonProps) => {
  const { colors } = useTheme();
  const backgroundColor = colors.background;
  const lineBorderRadius = 4;
  const lineHeight = 10;

  const getPlaceholderLine = (styles: ViewStyle = {}) => {
    return (
      <PlaceholderLine
        width={0}
        height={lineHeight}
        style={{
          backgroundColor,
          borderRadius: lineBorderRadius,
          ...styles,
        }}
      />
    );
  };

  const renderCardHeader = () => {
    const lineWidths = ['30%', '40%'];
    const placeholders = lineWidths.map(width => (
      <React.Fragment key={width}>{getPlaceholderLine({ width })}</React.Fragment>
    ));
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 40,
          marginLeft: 5,
          position: 'relative',
          top: 5,
        }}
      >
        {placeholders}
      </View>
    );
  };

  // return (
  //   <LottieAnimation
  //     source={require(`../../../../../../../assets/animations/loading-hand.json`)}
  //     finalFramePosition={1}
  //     shouldLoop={true}
  //     style={{
  //       width: '80%',
  //       height: '80%',
  //     }}
  //   />
  // );

  //* figure out which looks better!

  return (
    <Placeholder Animation={Fade} style={{ padding: 20, paddingTop: 0, position: 'relative', bottom: 20 }}>
      {renderCardHeader()}
      <PlaceholderMedia
        style={{
          backgroundColor,
          margin: 0,
          marginBottom: 10,
          height: eventCardImageHeight,
          width: '100%',
          elevation: 12,
          borderRadius: 10,
        }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {getPlaceholderLine({ width: '25%' })}
        {getPlaceholderLine({ width: '20%' })}
      </View>
      {getPlaceholderLine({ width: '40%' })}
    </Placeholder>
  );
};

export default EventListLoadingSkeleton;
