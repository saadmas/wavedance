import * as React from 'react';
import Dialog from '../../../../../../components/Dialog/Dialog';
import LottieInteractiveAnimation, {
  FramePosition,
} from '../../../../../../components/LottieInteractiveAnimation/LottieInteractiveAnimation';
import * as Haptics from 'expo-haptics';

interface EventFavoriteButtonProps {
  isFavorite: boolean;
  eventId: number;
  onFavoriteToggle: () => void;
  locationId: number;
}

const EventFavoriteButton = ({ isFavorite, onFavoriteToggle }: EventFavoriteButtonProps) => {
  const size = 40;
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [animationPlayerFlag, setAnimationPlayerFlag] = React.useState<number>(0);

  const onPress = () => {
    if (isFavorite) {
      setIsDialogOpen(true);
      return;
    }
    setAnimationPlayerFlag(prev => prev + 1);
    onFavoriteToggle();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const onDialogConfirm = () => {
    setAnimationPlayerFlag(prev => prev + 1);
    onFavoriteToggle();
    onDialogDismiss();
  };

  const onDialogDismiss = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <LottieInteractiveAnimation
        animationPlayerFlag={animationPlayerFlag}
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
