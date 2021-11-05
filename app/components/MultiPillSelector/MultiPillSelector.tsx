import * as React from 'react';
import { Button, Text, useTheme } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import Title from '../Title/Title';
import NextScreenButton from '../NextScreenButton/NextScreenButton';

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
  const { colors } = useTheme();

  const renderPills = () => {
    const pills = pillTexts.map(pillText => (
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
        <Text>Select at least {minPillCount}</Text>
        <Text>
          {selectedPillTexts.size}/{maxPillCount}
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
        contentInset={{ bottom: 50 }}
      >
        {renderPills()}
      </ScrollView>
      <NextScreenButton onPress={onSubmit} isDisabled={isSubmitButtonDisabled} />
    </>
  );
};

export default MultiPillSelector;