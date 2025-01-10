import { withAuth, withFind, withFindOne } from '@hocs';

import HomeView from './HomeView';
import User from 'src/models/user';
import compose from '@shopify/react-compose';
import withMutate from 'src/hocs/withMutate';
import withREST from 'src/hocs/withREST';
import UserAssessmentCycle from 'src/models/userAssessmentCycle';
import { BaselineStatus } from 'src/utils/status';

const getACsFilter = ({ user }: { user: User }) => {
  console.log('user', user);
  return {
    userId: user._id,
  };
};

const getSaleFilter = (props: any) => ({
  _id: {
    $in: props.userAssessmentCycles.map((ac: any) => ac.saleId),
  },
});

export default compose<any>(
  withMutate(),
  withAuth,
  withFind({
    collectionName: 'userAssessmentCycles',
    getFilter: getACsFilter,
    storeKey: 'userAssessmentCycleStore',
  }),
  withFindOne({
    collectionName: 'userSimulations',
    version: 2,
    getFilter: ({ user }: { user: User }) => ({
      userId: user._id,
      simulationType: 'Baseline',
      status: { $ne: BaselineStatus.HasNotAssigned },
    }),
    required: false,
    storeKey: 'userSimulationStore',
  })
)(HomeView);
