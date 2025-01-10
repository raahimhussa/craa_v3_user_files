import UiState, { SimulationMode } from 'src/stores/ui';

import AuthStore from 'src/stores/authStore';
import SimulationStore from 'src/stores/simulationStore';
import User from 'src/models/user';
import UserSimulationStore from 'src/stores/userSimulationStore';
import ViewportsView from './ViewportsView';
import compose from '@shopify/react-compose';
import { withFind } from '@hocs';
import withStore from 'src/hocs/withStore';

const getViewportsFilter = ({
  authStore: { user },
  userSimulationStore: { userSimulation },
  uiState: { simulationMode },
  simulationStore: { simulation },
}: {
  authStore: AuthStore;
  userSimulationStore: UserSimulationStore;
  uiState: UiState;
  simulationStore: SimulationStore;
}) => {
  const filter: any = {
    userId: user?._id,
    userSimulationId: userSimulation?._id,
    // simulationId: simulation?._id,
  };
  // filter.userSimulationId = userSimulation?._id;

  console.log('filter', filter);
  return filter;
};

export default compose<any>(
  withStore('authStore'),
  withStore('simulationStore'),
  withStore('userSimulationStore'),
  withStore('userSimulationStore'),
  withStore('uiState'),
  withFind({
    collectionName: 'viewports',
    getFilter: getViewportsFilter,
    getOptions: () => {
      return {
        sort: {
          index: 1,
        },
      };
    },
    version: 2,
    storeKey: 'viewportStore',
  })
)(ViewportsView);
