import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';

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
    <Placeholder Animation={Fade} style={{ padding: 20, paddingTop: 0 }}>
      <PlaceholderLine
        width={80}
        height={12}
        style={{
          backgroundColor,
          marginTop: 10,
          marginLeft: 5,
          position: 'relative',
          top: 5,
          borderRadius: lineBorderRadius,
        }}
      />
      <PlaceholderMedia
        style={{
          backgroundColor,
          margin: 0,
          marginBottom: 10,
          height: 350,
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
