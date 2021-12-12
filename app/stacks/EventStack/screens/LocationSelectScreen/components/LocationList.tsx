import * as React from 'react';
import { ScrollView } from 'react-native';
import { Divider, List, Text } from 'react-native-paper';
import { getEdmTrainCities, getEdmTrainStates } from '../../../../../edmTrain/locations';
import { EdmTrainLocation } from '../../../../../edmTrain/types';

interface LocationListProps {
  searchText: string;
  onLocationSelect: (location: EdmTrainLocation) => void;
}

const LocationList = ({ searchText, onLocationSelect }: LocationListProps) => {
  const [isCityGroupExpanded, setIsCityGroupExpanded] = React.useState(true);
  const [isStateGroupExpanded, setIsStateGroupExpanded] = React.useState(false);

  React.useEffect(() => {
    if (searchText) {
      setIsCityGroupExpanded(true);
      setIsStateGroupExpanded(true);
    }
  }, [searchText]);

  const toggleCityGroup = () => setIsCityGroupExpanded(prev => !prev);

  const toggleStateGroup = () => setIsStateGroupExpanded(prev => !prev);

  const renderLocationItem = (title: string, location?: EdmTrainLocation) => {
    return (
      <React.Fragment key={title}>
        <List.Item
          title={title}
          titleStyle={{ fontSize: 12 }}
          onPress={location ? () => onLocationSelect(location) : undefined}
        />
        <Divider style={{ width: '95%', backgroundColor: '#333' }} />
      </React.Fragment>
    );
  };

  const getCityDisplayText = (location: EdmTrainLocation): string => {
    const cityDisplayText = `${location.city}, ${location.stateCode}`;
    return cityDisplayText;
  };

  const renderCities = (): JSX.Element => {
    let cities = [...getEdmTrainCities().values()];

    if (searchText) {
      cities = cities.filter(location => getCityDisplayText(location).toLowerCase().includes(searchText));
    }

    if (!cities.length) {
      return renderLocationItem('No cities found');
    }

    const sortedCities = cities.sort((a, b) => (a.city ?? '')?.localeCompare(b.city ?? ''));
    const cityListItems = sortedCities.map(location => renderLocationItem(getCityDisplayText(location), location));

    return <>{cityListItems}</>;
  };

  const renderStates = (): JSX.Element => {
    let states = [...getEdmTrainStates().values()];

    if (searchText) {
      states = states.filter(location => location.state.toLowerCase().includes(searchText));
    }

    if (!states.length) {
      return renderLocationItem('No states found');
    }

    const sortedStates = states.sort((a, b) => a.state.localeCompare(b.state));
    const stateListItems = sortedStates.map(location => renderLocationItem(location.state, location));

    return <>{stateListItems}</>;
  };

  return (
    <ScrollView contentInset={{ bottom: 100 }}>
      <List.Section>
        <List.Accordion expanded={isCityGroupExpanded} title="Cities" onPress={toggleCityGroup}>
          {renderCities()}
        </List.Accordion>
      </List.Section>
      <List.Section>
        <List.Accordion expanded={isStateGroupExpanded} title="States" onPress={toggleStateGroup}>
          {renderStates()}
        </List.Accordion>
      </List.Section>
    </ScrollView>
  );
};

export default LocationList;
