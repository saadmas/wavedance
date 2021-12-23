import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

interface ReportOptionsProps {
  onOptionSelect: (option: string) => void;
  options: string[];
}

const ReportOptions = ({ options, onOptionSelect }: ReportOptionsProps) => {
  const renderOptions = () => {
    const optionElements = options.map((option, index) => (
      <TouchableWithoutFeedback
        key={option}
        onPress={() => onOptionSelect(option)}
        style={{ borderBottomColor: '#333', borderWidth: index === options.length - 1 ? 0 : 0.5, padding: 15 }}
      >
        <Text style={{ fontSize: 12 }}>{option}</Text>
      </TouchableWithoutFeedback>
    ));

    return optionElements;
  };

  return <ScrollView contentContainerStyle={{ maxHeight: 500 }}>{renderOptions()}</ScrollView>;
};

export default ReportOptions;
