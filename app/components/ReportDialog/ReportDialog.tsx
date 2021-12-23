import * as React from 'react';
import { View } from 'react-native';
import { Dialog, IconButton, Portal, Text, useTheme } from 'react-native-paper';
import {
  FakeSpamOrScammer,
  HateSpeech,
  InappropriateBehavior,
  InappropriateContent,
  Report,
  ReportCategory,
  SomeoneIsInDanger,
  UnderageOrMinor,
} from '../../state/enums/report';
import InputCard from '../InputCard/InputCard';
import ReportButtonGroup from './ReportButtonGroup/ReportButtonGroup';
import ReportOptions from './ReportOptions/ReportOptions';

interface ReportDialogProps {
  reportedOnId: string;
  eventId?: number;
}

const ReportDialog = ({}: ReportDialogProps) => {
  const { colors, fonts } = useTheme();
  const borderRadius = 10;

  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [actionType, setActionType] = React.useState<'Hide' | 'Report'>('Hide');
  const [report, setReport] = React.useState<string | undefined>(undefined);
  const [reportCategory, setReportCategory] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (report === Report.NotInterested) {
      setReportCategory(Report.NotInterested);
    }
  }, [report]);

  const saveReport = async () => {
    ///
  };

  const goBack = () => {
    if (reportCategory) {
      setReportCategory(undefined);

      if (reportCategory === Report.NotInterested) {
        setReport(undefined);
      }

      return;
    }

    if (report) {
      setReport(undefined);
      return;
    }
  };

  const openHideDialog = () => {
    setIsDialogOpen(true);
    setActionType('Hide');
  };

  const openReportDialog = () => {
    setIsDialogOpen(true);
    setActionType('Report');
  };

  const closeDialog = () => {
    setReport(undefined);
    setReportCategory(undefined);
    setIsDialogOpen(false);
  };

  const getTitle = () => {
    if (reportCategory) {
      return reportCategory;
    }

    if (report) {
      return report;
    }

    return actionType;
  };

  const getActionTypeVerb = () => {
    const actionTypeVerb = actionType === 'Hide' ? 'hiding' : 'reporting';
    return actionTypeVerb;
  };

  const getSubTitle = () => {
    if (reportCategory) {
      return;
    }

    if (report) {
      return;
    }

    return `Don\'t worry, your feedback is private. They won\'t know you're ${getActionTypeVerb()} them.`;
  };

  const getReportCategory = (report?: Report) => {
    switch (report) {
      case Report.FakeSpamOrScammer:
        return FakeSpamOrScammer;
      case Report.HateSpeech:
        return HateSpeech;
      case Report.InappropriateBehavior:
        return InappropriateBehavior;
      case Report.FakeSpamOrScammer:
        return FakeSpamOrScammer;
      case Report.InappropriateContent:
        return InappropriateContent;
      case Report.SomeoneIsInDanger:
        return SomeoneIsInDanger;
      case Report.UnderageOrMinor:
        return UnderageOrMinor;
      case Report.NotInterested:
      default:
        return;
    }
  };

  const renderUserInput = () => {
    if (reportCategory) {
      const onSubmit = (foo: string) => {};
      return (
        <View style={{ padding: 10, minHeight: 300 }}>
          <InputCard title="" onSubmit={onSubmit} placeholder="Additional information is required" />
        </View>
      );
      /// render user input
    }

    if (report) {
      const reportKey = Object.entries(Report).find(([_, text]) => text === report);
      const reportCategory = getReportCategory(reportKey?.[1]);
      if (reportCategory) {
        return <ReportOptions onOptionSelect={setReportCategory} options={Object.values(reportCategory)} />;
      }
    }

    return <ReportOptions onOptionSelect={setReport} options={Object.values(Report)} />;
  };

  const subTitle = getSubTitle();

  return (
    <>
      <ReportButtonGroup onHideUser={openHideDialog} onReportUser={openReportDialog} />
      <Portal>
        <Dialog
          visible={isDialogOpen}
          onDismiss={closeDialog}
          style={{ borderRadius, backgroundColor: colors.onSurface }}
        >
          <View
            style={{
              backgroundColor: colors.primary,
              borderTopEndRadius: borderRadius,
              borderTopStartRadius: borderRadius,
            }}
          >
            {report && <IconButton icon="chevron-left" size={20} onPress={goBack} />}
            <View style={{ padding: 20, paddingTop: report ? 0 : 20 }}>
              <Text style={{ fontFamily: fonts.thin.fontFamily, fontSize: 20 }}>{getTitle()}</Text>
              {subTitle && (
                <Text style={{ fontFamily: fonts.thin.fontFamily, fontSize: 12, marginTop: 5 }}>{subTitle}</Text>
              )}
            </View>
          </View>
          {renderUserInput()}
        </Dialog>
      </Portal>
    </>
  );
};

export default ReportDialog;
