import * as React from 'react';
import { Image, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { IconButton, Menu, Text } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import { useEventImageCache } from '../../../../../../state/events/EventImageCacheProvider';
import { NavigationContext } from '@react-navigation/native';
import { Path } from '../../../../../../routing/paths';
import { EdmTrainEvent } from '../../../../../../../functions/src/types';
import { getUserEventPrompts } from '../../../../utils';
import firebase from 'firebase';

interface EventActionsMenuProps {
  event: EdmTrainEvent;
  isFavorite: boolean;
}

const EventActionsMenu = ({ event, isFavorite }: EventActionsMenuProps) => {
  const [visible, setVisible] = React.useState(false);
  const navigation = React.useContext(NavigationContext);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const eventImageCache = useEventImageCache();
  const spotifyArtistId = eventImageCache.get(event.id)?.spotifyArtistId;

  const openEdmTrainEventWebpage = () => {
    closeMenu();
    WebBrowser.openBrowserAsync(event.link);
  };

  const openSpotifyArtistWebpage = () => {
    closeMenu();
    WebBrowser.openBrowserAsync(`https://open.spotify.com/artist/${spotifyArtistId}`);
  };

  const navigateToEventPrompts = async () => {
    closeMenu();
    //f remove foo
    const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const previouslyFilledPrompts = await getUserEventPrompts(uid, event.id);
    navigation?.navigate(Path.EventPrompts, { event, previouslyFilledPrompts, isEditMode: true });
  };

  const getMenuOptionStyles = (): ViewStyle => ({
    flexDirection: 'row',
    width: 180,
    alignItems: 'center',
    height: 40,
    paddingRight: 5,
  });

  const getMenuOptionTextStyles = () => ({ fontSize: 10 });

  const renderSpotifyAction = () => {
    if (spotifyArtistId) {
      return (
        <TouchableWithoutFeedback onPress={openSpotifyArtistWebpage}>
          <View style={getMenuOptionStyles()}>
            <IconButton
              icon={require('../../../../../../../assets/icons/spotify-icon.png')}
              size={18}
              color="#1DB954"
              onPress={openSpotifyArtistWebpage}
              style={{ marginRight: 0 }}
            />
            <Text style={getMenuOptionTextStyles()}>View artist</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  };

  const renderEdmTrainAction = () => {
    if (event.link) {
      return (
        <TouchableWithoutFeedback onPress={openEdmTrainEventWebpage}>
          <View style={getMenuOptionStyles()}>
            <Image
              source={require('../../../../../../../assets/icons/edm-train-icon.png')}
              style={{ height: 20, width: 20, borderRadius: 1000, marginLeft: 10, marginRight: 4 }}
            />
            <Text style={getMenuOptionTextStyles()}>View event info</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  };

  const renderEditEventPrompts = () => {
    if (isFavorite) {
      return (
        <TouchableWithoutFeedback onPress={navigateToEventPrompts}>
          <View style={getMenuOptionStyles()}>
            <IconButton icon={'pencil'} size={18} onPress={openSpotifyArtistWebpage} style={{ marginRight: 0 }} />
            <Text style={getMenuOptionTextStyles()}>Edit event prompts</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  };

  const anchor = <IconButton icon="dots-horizontal" onPress={openMenu} />;

  return (
    <Menu visible={visible} onDismiss={closeMenu} anchor={anchor} contentStyle={{ borderWidth: 0 }}>
      {renderSpotifyAction()}
      {renderEdmTrainAction()}
      {renderEditEventPrompts()}
    </Menu>
  );
};

export default EventActionsMenu;
