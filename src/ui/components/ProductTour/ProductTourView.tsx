import { observer } from 'mobx-react';
import { useEffect } from 'react';
import Joyride, {
  ACTIONS,
  CallBackProps,
  EVENTS,
  STATUS,
  Step,
} from 'react-joyride';
import { useSetState, useMount } from 'react-use';
import { useRootStore } from 'src/stores';
import customTheme from 'src/ui/theme/customizedTheme';
import { baselineTour, trainingTour, viewportTour } from './steps';

function ProductTourView(props: any) {
  const {
    type,
  }: {
    type: string;
  } = props;

  interface State {
    // run: boolean;
    steps: Step[];
  }

  const { userAssessmentCycleStore, uiState, viewportStore } = useRootStore();
  const [{ steps }, setState] = useSetState<State>({
    // run: openTour,
    //@ts-ignore
    steps:
      type === 'baseline'
        ? baselineTour
        : type === 'training'
        ? trainingTour
        : type === 'viewport'
        ? viewportTour
        : '',
  });

  const locale = {
    skip: 'Close',
  };

  // useEffect(() => {
  //   handleClickStart();
  // }, []);

  const handleClickStart = () => {
    // event?.preventDefault();
    // setOpenTour(true);
    // setState({
    //   run: true,
    // });
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      // setState({ run: false });
      // const param =
      //   props.type === 'baseline'
      //     ? { isBaselineTour: true }
      //     : props.type === 'training'
      //     ? { isTrainingTour: true }
      //     : props.type === 'viewport'
      //     ? { isViewportTour: true }
      //     : '';
      // userAssessmentCycleStore.userAssessmentCycleRepository.update({
      //   filter: {
      //     _id: userAssessmentCycleStore.userAssessmentCycles[0]._id,
      //   },
      //   update: {
      //     ...param,
      //   },
      // });
      // if (props.type === 'baseline') {
      //   userAssessmentCycleStore.isBaselineTour = true;
      // } else if (props.type === 'training') {
      //   userAssessmentCycleStore.isTrainingTour = true;
      // } else if (props.type === 'viewport') {
      //   userAssessmentCycleStore.isViewportTour = true;
      // }
      // setOpenTour(false);
      // uiState.userAssessmentCycle.mutate &&
      //   uiState.userAssessmentCycle.mutate();
    } else if (
      ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)
    ) {
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

      //   if (viewportStore.isTreeOpen && index === 6) {
      //     setTimeout(() => {
      //       setOpenTour(true);
      //     }, 400);
      //   } else if (viewportStore.isFolderOpen && index === 7) {
      //     setTimeout(() => {
      //       setOpenTour(true);
      //     }, 400);
      //   }
    }

    // logGroup(type, data);
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={true}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: customTheme.craa?.palette.main,
        },
      }}
      locale={locale}
    />
  );
}
export default observer(ProductTourView);
