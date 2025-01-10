import { withFindOne, withRouteParam } from '@hocs';

import UserFollowupView from './UserFollowupView';
import compose from '@shopify/react-compose';

const getUserFollowupFilter = ({
  userSimulationId,
}: {
  userSimulationId: string;
}) => {
  // console.log('userSimulationId filter', userSimulationId)

  return {
    _id: userSimulationId,
  };
};

const getScreenRecorderFilter = (props: any) => {
  // console.log('userSimulationId', props.userSimulationId)

  return {
    userSimulationId: props.userSimulationId,
  };
};

export default compose<any>(
  withRouteParam,
  withFindOne({
    collectionName: 'userSimulations',
    getFilter: getUserFollowupFilter,
    version: 2,
  }),
  withFindOne({
    collectionName: 'screenRecorders',
    getFilter: getScreenRecorderFilter,
    version: 2,
    required: false,
    storeKey: 'screenRecorderStore',
  })
)(UserFollowupView);
