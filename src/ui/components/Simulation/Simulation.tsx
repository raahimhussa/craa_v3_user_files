import { withFindOne, withFind } from '@hocs';
import compose from '@shopify/react-compose';
import { useRootStore } from 'src/stores';
import SimulationView from './SimulationView';
const getSimulationFilter = ({ simulationId }: { simulationId: string }) => {
  console.log(simulationId);
  return {
    _id: simulationId,
  };
};

const getACsFilter = () => {
  // console.log('user', user)
  const { userSimulationStore } = useRootStore();
  return {
    userId: userSimulationStore.userSimulation?.userId,
  };
};

export default compose<any>(
  withFindOne({
    collectionName: 'simulations',
    getFilter: getSimulationFilter,
    storeKey: 'simulationStore',
  }),
  withFind({
    collectionName: 'userAssessmentCycles',
    getFilter: getACsFilter,
    storeKey: 'userAssessmentCycleStore',
  })
)(SimulationView);
