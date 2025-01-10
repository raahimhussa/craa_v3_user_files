import PDF from '../PDF/PDF';
import ReactScroll from '../ReactScroll/ReactScroll';
import Swal from 'sweetalert2';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
import Viewport from 'src/models/viewport';
import { LogScreen, SimEvent } from 'src/models/log/types';

function ProtocolView({ doc }: { doc: any }) {
  const {
    modalStore,
    uiState: { userSimulation, baselineCard },
    logStore,
  } = useRootStore();
  const { userSimulationStore } = useRootStore();

  const onClick = async () => {
    try {
      await userSimulationStore.userSimulationRepository.update({
        filter: {
          _id: modalStore.userSimulation?._id,
        },
        update: {
          $addToSet: {
            protocols: {
              // assessmentTypeId: modalStore.userSimulation?.assessmentTypeId,
              protocolId: modalStore.protocol.payload.protocolId,
              isViewed: true,
            },
          },
        },
      });
      // userSimulationStore.userSimulation?.protocols.push({
      //   assessmentTypeId: modalStore.userSimulation?.assessmentTypeId,
      //   isViewed: true,
      // });
      if (
        userSimulationStore.userSimulations[
          modalStore.userSimulation?._id
        ]?.protocols.find(
          (protocol: any) =>
            protocol.protocolId === modalStore.protocol.payload.protocolId
        ) === undefined
      ) {
        userSimulationStore.userSimulations[
          modalStore.userSimulation?._id
        ]?.protocols.push({
          protocolId: modalStore.protocol.payload.protocolId,
          assessmentTypeId:
            userSimulationStore.userSimulations[modalStore.userSimulation?._id]
              ?.assessmentTypeId,
          isViewed: true,
        });
      }
      await logStore.create(
        SimEvent.onClickProtocol,
        LogScreen.AssessmentCycle
      );
      baselineCard.mutate && baselineCard.mutate();
      userSimulation.mutate && userSimulation.mutate();
    } catch (error) {
      return Swal.fire({ title: 'Error', icon: 'error', heightAuto: false });
    } finally {
      modalStore.protocol.isVisible = false;
    }
  };

  return (
    <ReactScroll
      type="protocol"
      onClick={onClick}
      title={doc.title}
      content={
        <PDF
          vertical
          url={doc.file.url}
          currentPage={0}
          simDoc={''}
          viewport={{} as Viewport}
        />
      }
    />
  );
}
export default observer(ProtocolView);
