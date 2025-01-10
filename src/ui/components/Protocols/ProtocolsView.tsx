import { StepItem } from '../Stepper/type';
import Stepper from '../Stepper/Stepper';
import UserBaseline from 'src/models/userSimulation';
import axios from 'axios';
import { getErrMsg } from '@utils';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
import UserSimulation from 'src/models/userSimulation';
import { LogScreen, SimEvent } from 'src/models/log/types';

function ProtocolsView({
  protocolIds,
  userSimulation,
  userSimulationMutate,
}: {
  protocolIds: string[];
  userSimulation: UserSimulation;
  userSimulationMutate: () => void;
}) {
  const { modalStore, logStore, userSimulationStore } = useRootStore();
  const steps = protocolIds.map((protocolId, index) => {
    const number: number = index + 1;
    if (
      userSimulationStore.userSimulations[userSimulation?._id]?.protocols !==
      undefined
    ) {
      return {
        _id: protocolId,
        isCompleted: userSimulationStore.userSimulations[
          userSimulation?._id
        ]?.protocols.find((protocol: any) => protocol.protocolId === protocolId)
          ?.isViewed,
        label: 'protocol' + ' - ' + number,
        view: async () => {
          modalStore.protocol.isVisible = true;
          modalStore.protocol.payload.protocolId = protocolId;
          modalStore.userSimulation = userSimulation;
        },
      };
    }
  });

  const onClickStep = (step: StepItem) => {
    modalStore.protocol.isVisible = true;
    modalStore.protocol.payload.protocolId = step._id;
    modalStore.protocol.buttons = [
      {
        text: 'Confirm',
        onClick: async () => {
          modalStore.protocol.isVisible = false;
        },
      },
    ];
  };
  return <Stepper steps={steps} onClickStep={onClickStep} />;
}
export default observer(ProtocolsView);
