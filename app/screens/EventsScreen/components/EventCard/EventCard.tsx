import * as React from 'react';
import { Image, View } from 'react-native';
import { List, Surface, Text, useTheme } from 'react-native-paper';
import LottieAnimation from '../../../../components/LottieAnimation/LottieAnimation';
import { getEventDateDisplay } from '../../../../utils/prompts/date.util';
import { DisplayEvent } from '../EventList/EventList';

interface EventCardProps {
  event: DisplayEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  const { fonts } = useTheme();
  const borderRadius = 10;

  const getArtists = (): string => event.artistList.map(artist => artist.name).join(', ');

  const getTitle = (): string => {
    return event.name ?? getArtists();
  };

  const renderListItem = (title: string, icon: string) => {
    return (
      <List.Item
        style={{ padding: 0, marginBottom: 5, position: 'relative' }}
        titleStyle={{ padding: 0, margin: 0, fontSize: 12 }}
        title={title}
        titleNumberOfLines={100}
        left={props => <List.Icon {...props} icon={icon} style={{ margin: 0, width: 20, height: 25 }} />}
      />
    );
  };

  const renderArtists = (): React.ReactNode => {
    if (!event.artistList.length) {
      return;
    }

    const artists = getArtists();
    return renderListItem(artists, 'account-music-outline');
  };

  const renderEventDate = (): React.ReactNode => {
    if (event.date) {
      const dateDisplay = getEventDateDisplay(event.date);
      return renderListItem(dateDisplay, 'calendar-range');
    }
  };

  const renderEventVenue = (): React.ReactNode => {
    if (event.venue?.name) {
      return renderListItem(event.venue.name, 'map-marker');
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        margin: 25,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: fonts.thin.fontFamily,
        }}
      >
        {getTitle()}
      </Text>
      <Surface
        style={{
          marginTop: 5,
          marginBottom: 10,
          height: 350,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 12,
          borderRadius,
        }}
      >
        <Image
          source={{ uri: 'https://i.scdn.co/image/ab6761610000e5eb2dc40ac263ef07c16a95af4e' }}
          style={{ height: '100%', width: '100%' }}
          borderRadius={borderRadius}
          resizeMode="cover"
        />
        {/* <LottieAnimation
          source={require(`../../../../../assets/animations/dj-mixer.json`)}
          finalFramePosition={1}
          shouldLoop={true}
        /> */}
        {/* /// */}
        {/* {renderImageContent()} */}
      </Surface>
      {renderEventDate()}
      {renderArtists()}
      {renderEventVenue()}
    </View>
  );
};

export default EventCard;
