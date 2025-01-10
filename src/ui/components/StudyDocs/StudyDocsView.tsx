import { StepItem } from '../Stepper/type';
import Stepper from '../Stepper/Stepper';
import UserBaseline from 'src/models/userSimulation';
import axios from 'axios';
import { getErrMsg } from '@utils';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
import UserSimulation from 'src/models/userSimulation';
import { LogScreen, SimEvent } from 'src/models/log/types';

function StudyDocsView({
  studyDocIds,
  userSimulationMutate,
  userSimulation,
}: {
  studyDocIds: string[];
  userSimulationMutate: () => void;
  userSimulation: UserSimulation;
}) {
  /**
   * @todo studylog vs studyDocu 결정
   */
  const {
    modalStore,
    logStore,
    userSimulationStore,
    // userSimulationStore: { userSimulation },
  } = useRootStore();

  const steps = studyDocIds.map((studyDocId, index) => {
    const number = index + 1;
    if (
      userSimulationStore.userSimulations[userSimulation?._id]?.studyLogs !==
      undefined
    ) {
      return {
        _id: studyDocId,
        isCompleted: userSimulationStore.userSimulations[
          userSimulation?._id
        ]?.studyLogs.find((studyLog: any) => studyLog.studyDocId === studyDocId)
          ?.isViewed,
        label: 'studyDoc' + ' - ' + number,
        view: async () => {
          modalStore.studyDoc.isVisible = true;
          modalStore.studyDoc.payload.studyDocId = studyDocId;
          modalStore.userSimulation = userSimulation;
        },
      };
    }
  });
  const onClickStep = (step: StepItem) => {
    modalStore.studyDoc.isVisible = true;
    modalStore.studyDoc.payload.studyDocId = step._id;
    modalStore.studyDoc.buttons = [
      {
        text: 'Confirm',
        onClick: async () => {
          modalStore.studyDoc.isVisible = false;
        },
      },
    ];
  };
  return <Stepper steps={steps} onClickStep={onClickStep} />;
}
export default observer(StudyDocsView);
