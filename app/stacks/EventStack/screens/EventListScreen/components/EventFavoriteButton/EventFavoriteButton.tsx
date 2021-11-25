import * as React from 'react';
import LottieInteractiveAnimation from '../../../../../../components/LottieInteractiveAnimation/LottieInteractiveAnimation';

interface EventFavoriteButtonProps {
  isFavoritesList: boolean;
  size: number;
  eventId: number;
}

const EventFavoriteButton = ({ isFavoritesList, size }: EventFavoriteButtonProps) => {
  const onPress = () => {};
  return (
    <LottieInteractiveAnimation
      source={require(`'../../../../../../../assets/animations/heart-favorite.json`)}
      onPress={onPress}
      playBackwards={true}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default EventFavoriteButton;
