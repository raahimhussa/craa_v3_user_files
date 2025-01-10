import { StepItem } from '../Stepper/type';
import Stepper from '../Stepper/Stepper';
import UserBaseline from 'src/models/userSimulation';
import axios from 'axios';
import { getErrMsg } from '@utils';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
import UserSimulation from 'src/models/userSimulation';
import { LogScreen, SimEvent } from 'src/models/log/types';
function InstructionsView({
  instructionIds = [],
  userSimulation,
  userSimulationMutate,
}: {
  instructionIds: string[];
  userSimulation: UserSimulation;
  userSimulationMutate: () => void;
}) {
  /**
   * @description assessmentType은 혹시 몰라서 저정 했는데 필요 없을 수도.
   */
  const { modalStore, userSimulationStore, logStore } = useRootStore();
  if (!userSimulation) {
    return null;
  }

  const steps = instructionIds.map((instructionId, index) => {
    const number = index + 1;
    if (
      userSimulationStore.userSimulations[userSimulation?._id]?.instructions !==
      undefined
    ) {
      return {
        _id: instructionId,
        isCompleted: userSimulationStore.userSimulations[
          userSimulation?._id
        ]?.instructions.find(
          (instruction: any) => instruction.instructionId === instructionId
        )?.isViewed,
        label: 'Instruction' + ' - ' + number,
        view: async () => {
          modalStore.instruction.isVisible = true;
          modalStore.instruction.payload.instructionId = instructionId;
          modalStore.userSimulation = userSimulation;
          // ];
        },
      };
    }
  });

  const onClickStep = (step: StepItem) => {
    modalStore.instruction.isVisible = true;
    modalStore.instruction.payload.instructionId = step._id;
    modalStore.instruction.buttons = [
      {
        text: 'Confirm',
        onClick: async () => {
          modalStore.instruction.isVisible = false;
        },
      },
    ];
  };
  return (
    <Stepper steps={steps} onClickStep={onClickStep} orientation="vertical" />
  );
}

export default observer(InstructionsView);
