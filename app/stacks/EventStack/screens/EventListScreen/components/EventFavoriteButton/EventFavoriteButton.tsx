import * as React from 'react';
import Dialog from '../../../../../../components/Dialog/Dialog';
import LottieInteractiveAnimation, {
  FramePosition,
} from '../../../../../../components/LottieInteractiveAnimation/LottieInteractiveAnimation';

interface EventFavoriteButtonProps {
  isFavorite: boolean;
  size: number;
  eventId: number;
  onFavoriteToggle: () => void;
  locationId: number;
}

const EventFavoriteButton = ({ isFavorite, size, onFavoriteToggle }: EventFavoriteButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const onPress = () => {
    if (isFavorite) {
      setIsDialogOpen(true);
      return;
    }
    onFavoriteToggle();
  };

  const onDialogConfirm = () => {
    onFavoriteToggle();
    setIsDialogOpen(false);
  };

  const onDialogDismiss = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <LottieInteractiveAnimation
        source={require(`'../../../../../../../assets/animations/heart-favorite.json`)}
        onPress={onPress}
        initialFramePosition={isFavorite ? FramePosition.End : FramePosition.Start}
        style={{ width: size, height: size }}
        speed={2}
      />
      <Dialog
        isVisible={isDialogOpen}
        onDismiss={onDialogDismiss}
        onPrimaryAction={onDialogConfirm}
        primaryButtonText="Remove"
        title="Are you sure you want to remove from favorites?"
        description="Others won't be able to view your profile for this event"
      />
    </>
  );
};

export default EventFavoriteButton;
