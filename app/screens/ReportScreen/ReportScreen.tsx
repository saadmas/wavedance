import * as React from 'react';
import { View } from 'react-native';
import { ProgressBar, useTheme } from 'react-native-paper';

interface ReportScreenProps {
  actionType: 'hide' | 'report';
}

// const reportSteps = [
//   { title: 'What\'s }
// ]
const ReportScreen = ({}: ReportScreenProps) => {
  const { colors } = useTheme();
  const [reportStep, setReportStep] = React.useState<number>(0);
  const reportStepCount = 3;

  const getProgress = (): number => (reportStep + 1) / reportStepCount;

  return (
    <View>
      <ProgressBar progress={getProgress()} color={colors.text} />
    </View>
  );
};

export default ReportScreen;
