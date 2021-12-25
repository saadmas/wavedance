import * as React from 'react';
import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { getArtistsDisplay } from '../../../../../../edmTrain/utils';
import { WaveEvent } from '../../../../../../firebase/types';
import { getEventDateDisplay } from '../../../../../../utils/prompts/date.util';
import WaveProfileEventImage from '../WaveProfileEventImage/WaveProfileEventImage';

interface WaveProfileEventProps {
  event: WaveEvent;
}

const WaveProfileEvent = ({ event }: WaveProfileEventProps) => {
  const { fonts } = useTheme();

  const getTruncatedText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  const renderEventDetail = (title: string, icon: string) => {
    const iconSize = 12;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          <IconButton
            icon={icon}
            style={{ margin: 0, padding: 0, height: iconSize, width: iconSize }}
            size={iconSize}
          />
        </Text>
        <Text style={{ fontSize: 9, position: 'relative', bottom: 2, marginLeft: 2 }}>{title}</Text>
      </View>
    );
  };

  const renderEventName = (): React.ReactNode => {
    const eventName = event.name ?? getArtistsDisplay(event);
    const truncatedEventName = getTruncatedText(eventName, 40);

    return (
      <Text
        style={{
          fontSize: 12,
          fontFamily: fonts.thin.fontFamily,
          marginBottom: 5,
        }}
      >
        {truncatedEventName}
      </Text>
    );
  };

  const renderArtists = (): React.ReactNode => {
    if (!event.name) {
      return;
    }

    if (!event.artistList?.length) {
      return;
    }

    const artists = getArtistsDisplay(event);

    return <View style={{ maxWidth: '86%' }}>{renderEventDetail(artists, 'account-music-outline')}</View>;
  };

  const renderEventDate = (): React.ReactNode => {
    if (event.date) {
      const dateDisplay = getEventDateDisplay(event.date);
      return renderEventDetail(dateDisplay, 'calendar-range');
    }
  };

  const renderEventVenue = (): React.ReactNode => {
    if (event.venue?.name) {
      const { name } = event.venue;
      return renderEventDetail(getTruncatedText(name, 30), 'map-marker-outline');
    }
  };

  const renderVenueDateRow = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 5,
        }}
      >
        <View style={{ marginRight: 10 }}>{renderEventDate()}</View>
        {renderEventVenue()}
      </View>
    );
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <WaveProfileEventImage eventId={event.id} locationId={event.locationId} />
      <View style={{ marginTop: 10, marginLeft: 5 }}>
        {renderEventName()}
        {renderVenueDateRow()}
        {renderArtists()}
      </View>
    </View>
  );
};

export default WaveProfileEvent;
