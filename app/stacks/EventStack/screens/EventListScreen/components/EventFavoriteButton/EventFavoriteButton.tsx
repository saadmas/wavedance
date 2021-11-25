import * as React from 'react';
import LottieInteractiveAnimation, {
  FramePosition,
} from '../../../../../../components/LottieInteractiveAnimation/LottieInteractiveAnimation';

interface EventFavoriteButtonProps {
  isFavorite: boolean;
  size: number;
  eventId: number;
  locationId: number;
}

const EventFavoriteButton = ({ isFavorite, size }: EventFavoriteButtonProps) => {
  const [isFavoriteEvent, setIsFavoriteEvent] = React.useState<boolean | undefined>(isFavorite);

  const onPress = () => {
    if (isFavoriteEvent) {
      /// open unfavorite confirmation modal
    } else {
      /// navigate to prompt page
    }
    setIsFavoriteEvent(!isFavoriteEvent);
  };

  return isFavoriteEvent === undefined ? null : (
    <LottieInteractiveAnimation
      source={require(`'../../../../../../../assets/animations/heart-favorite.json`)}
      onPress={onPress}
      initialFramePosition={isFavoriteEvent ? FramePosition.End : FramePosition.Start}
      style={{ width: size, height: size }}
    />
  );
};

export default EventFavoriteButton;
