import PDF from '../PDF/PDF';
import ReactScroll from '../ReactScroll/ReactScroll';
import Swal from 'sweetalert2';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
import Viewport from 'src/models/viewport';
import { LogScreen, SimEvent } from 'src/models/log/types';

function StudyDocView({ simDoc }: { simDoc: any }) {
  const {
    modalStore,
    userSimulationStore,
    uiState: { userSimulation, baselineCard },
    logStore,
  } = useRootStore();
  const onClick = async () => {
    try {
      await userSimulationStore.userSimulationRepository.update({
        filter: {
          _id: modalStore.userSimulation?._id,
        },
        update: {
          $addToSet: {
            studyLogs: {
              // assessmentTypeId: modalStore.userSimulation?.assessmentTypeId,
              studyDocId: modalStore.studyDoc.payload.studyDocId,
              isViewed: true,
            },
          },
        },
      });
      // userSimulationStore.userSimulations[
      //   modalStore.userSimulation?._id
      // ]?.studyLogs.push({
      //   assessmentTypeId:
      //     userSimulationStore.userSimulations[modalStore.userSimulation?._id]
      //       ?.assessmentTypeId,
      //   isViewed: true,
      // });
      console.log(
        userSimulationStore.userSimulations[modalStore.userSimulation?._id]
      );
      if (
        userSimulationStore.userSimulations[
          modalStore.userSimulation?._id
        ]?.studyLogs.find(
          (studyLog: any) =>
            studyLog.studyDocId === modalStore.studyDoc.payload.studyDocId
        ) === undefined
      ) {
        userSimulationStore.userSimulations[
          modalStore.userSimulation?._id
        ]?.studyLogs.push({
          studyDocId: modalStore.studyDoc.payload.studyDocId,
          assessmentTypeId:
            userSimulationStore.userSimulations[modalStore.userSimulation?._id]
              ?.assessmentTypeId,
          isViewed: true,
        });
      }
      await logStore.create(
        SimEvent.onClickStudyDoc,
        LogScreen.AssessmentCycle
      );
      baselineCard.mutate && baselineCard?.mutate();
      userSimulation.mutate && userSimulation?.mutate();
    } catch (error) {
      return Swal.fire({ title: 'Error', icon: 'error', heightAuto: false });
    } finally {
      modalStore.studyDoc.isVisible = false;
    }
  };

  return (
    <ReactScroll
      type="studydoc"
      title={simDoc[0]?.title}
      onClick={onClick}
      content={
        <PDF
          vertical
          url={simDoc[0]?.files[0]?.url}
          currentPage={0}
          simDoc={''}
          viewport={{} as Viewport}
        />
      }
    />
  );
}
export default observer(StudyDocView);
