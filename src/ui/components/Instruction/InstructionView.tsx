import ReactScroll from '../ReactScroll/ReactScroll';
import Swal from 'sweetalert2';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
import { LogScreen, SimEvent } from 'src/models/log/types';
function InstructionView({
  doc,
}: {
  doc: {
    title: string;
    htmlContent: string;
  };
}) {
  const {
    userSimulationStore,
    modalStore,
    uiState: { baselineCard, userSimulation },
    logStore,
  } = useRootStore();
  console.log(modalStore.userSimulation);

  const onClick = async () => {
    try {
      await userSimulationStore.userSimulationRepository.update({
        filter: {
          _id: modalStore.userSimulation?._id,
        },
        update: {
          $addToSet: {
            instructions: {
              // assessmentTypeId: modalStore.userSimulation?.assessmentTypeId,
              instructionId: modalStore.instruction.payload.instructionId,
              isViewed: true,
            },
          },
        },
      });
      // userSimulationStore.userSimulations[
      //   modalStore.userSimulation?._id
      // ]?.instructions.push({
      //   assessmentTypeId:
      //     userSimulationStore.userSimulations[modalStore.userSimulation?._id]
      //       ?.assessmentTypeId,
      //   isViewed: true,
      // });
      if (
        userSimulationStore.userSimulations[
          modalStore.userSimulation?._id
        ]?.instructions.find(
          (instruction: any) =>
            instruction.instructionId ===
            modalStore.instruction.payload.instructionId
        ) === undefined
      ) {
        userSimulationStore.userSimulations[
          modalStore.userSimulation?._id
        ]?.instructions.push({
          instructionId: modalStore.instruction.payload.instructionId,
          assessmentTypeId:
            userSimulationStore.userSimulations[modalStore.userSimulation?._id]
              ?.assessmentTypeId,
          isViewed: true,
        });
      }
      await logStore.create(
        SimEvent.onClickInstruction,
        LogScreen.AssessmentCycle
      );
      baselineCard.mutate && baselineCard.mutate();
      userSimulation.mutate && userSimulation.mutate();
      userSimulationStore.userSimulations[modalStore.userSimulation?._id]
        ?.mutate &&
        userSimulationStore.userSimulations[
          modalStore.userSimulation?._id
        ].mutate();
    } catch (error) {
      return Swal.fire({ title: 'Error', icon: 'error', heightAuto: false });
    } finally {
      modalStore.instruction.isVisible = false;
    }
  };

  return (
    <ReactScroll
      type="instruction"
      htmlContent={doc.htmlContent}
      title={doc.title}
      onClick={onClick}
    />
  );
}
export default observer(InstructionView);
