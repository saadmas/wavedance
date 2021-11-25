import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';
import LottieAnimation from '../../../../../../components/LottieAnimation/LottieAnimation';
import { eventCardImageHeight } from '../EventImage/EventImage';

interface EventListLoadingSkeletonProps {}

const EventListLoadingSkeleton = ({}: EventListLoadingSkeletonProps) => {
  const { colors } = useTheme();
  const backgroundColor = colors.background;
  const lineBorderRadius = 4;

  const renderCardDetailLines = () => {
    const detailLineWidths = [50, 60, 20];

    const detailLines = detailLineWidths.map(width => (
      <PlaceholderLine
        key={width}
        width={width}
        height={10}
        style={{ backgroundColor, marginLeft: 5, borderRadius: lineBorderRadius }}
      />
    ));

    return <>{detailLines}</>;
  };

  return (
    <LottieAnimation
      source={require(`../../../../../../../assets/animations/loading-hand.json`)}
      finalFramePosition={1}
      shouldLoop={true}
      style={{
        width: '80%',
        height: '80%',
      }}
    />
  );

  //* figure out which looks better!

  return (
    <Placeholder Animation={Fade} style={{ padding: 20, paddingTop: 0, position: 'relative', bottom: 20 }}>
      <PlaceholderLine
        width={0}
        height={30}
        style={{
          backgroundColor,
          marginTop: 10,
          marginLeft: 5,
          position: 'relative',
          top: 20,
          width: '98%',
          borderRadius: lineBorderRadius + 5,
        }}
      />
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
      {renderCardDetailLines()}
    </Placeholder>
  );
};

export default EventListLoadingSkeleton;
