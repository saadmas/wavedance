import * as React from 'react';
import LottieInteractiveAnimation, {
  FramePosition,
} from '../../../../../../components/LottieInteractiveAnimation/LottieInteractiveAnimation';

interface EventFavoriteButtonProps {
  isFavorite: boolean;
  size: number;
  eventId: number;
  onHeartPress: () => void;
  locationId: number;
}

const EventFavoriteButton = ({ isFavorite, size, onHeartPress }: EventFavoriteButtonProps) => {
  return (
    <LottieInteractiveAnimation
      source={require(`'../../../../../../../assets/animations/heart-favorite.json`)}
      onPress={onHeartPress}
      initialFramePosition={isFavorite ? FramePosition.End : FramePosition.Start}
      style={{ width: size, height: size }}
      speed={2}
    />
  );
};

export default EventFavoriteButton;
