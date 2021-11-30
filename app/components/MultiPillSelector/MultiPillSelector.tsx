import * as React from 'react';
import { Button, Searchbar, Text, useTheme } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import Title from '../Title/Title';
import NextScreenButton from '../NextScreenButton/NextScreenButton';
import { textFontSize } from '../../styles/theme';

interface MultiPillSelectorProps {
  titleText: string;
  minPillCount: number;
  maxPillCount: number;
  pillTexts: string[];
  selectedPillTexts: Set<string>;
  isSubmitButtonDisabled: boolean;
  onPillToggle: (pillText: string) => void;
  onSubmit: () => void;
}

const MultiPillSelector = ({
  isSubmitButtonDisabled,
  pillTexts,
  selectedPillTexts,
  titleText,
  minPillCount,
  maxPillCount,
  onPillToggle,
  onSubmit,
}: MultiPillSelectorProps) => {
  const [filteredPillTexts, setFilteredPillTexts] = React.useState<string[]>(pillTexts);
  const [searchText, setSearchText] = React.useState<string>('');
  const { colors } = useTheme();

  React.useEffect(() => {
    if (searchText) {
      setFilteredPillTexts(pillTexts.filter(t => t.toLowerCase().includes(searchText.toLowerCase())));
      return;
    }
    setFilteredPillTexts(pillTexts);
  }, [searchText]);

  const renderPills = () => {
    const pills = filteredPillTexts.map(pillText => (
      <Button
        mode="outlined"
        key={pillText}
        style={{
          maxWidth: 150,
          borderRadius: 40,
          margin: 10,
          marginLeft: 0,
          borderColor: selectedPillTexts.has(pillText) ? colors.primary : colors.text,
        }}
        labelStyle={{ fontSize: 12 }}
        compact={true}
        uppercase={false}
        onPress={() => onPillToggle(pillText)}
        theme={{ colors: { primary: selectedPillTexts.has(pillText) ? colors.primary : colors.text } }}
      >
        {pillText}
      </Button>
    ));
    return pills;
  };

  return (
    <>
      <Title title={titleText} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: textFontSize }}>Select at least {minPillCount}</Text>
        <Text style={{ fontSize: textFontSize }}>
          {selectedPillTexts.size}/{maxPillCount}
        </Text>
      </View>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchText}
        value={searchText}
        style={{ marginTop: 10, marginBottom: 10, borderRadius: 5, fontSize: textFontSize, height: 35 }}
        inputStyle={{ fontSize: textFontSize }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <NextScreenButton onPress={onSubmit} isDisabled={isSubmitButtonDisabled} />
      </View>
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
        contentInset={{ bottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {renderPills()}
      </ScrollView>
    </>
  );
};

export default MultiPillSelector;
