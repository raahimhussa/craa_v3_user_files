import UserBaselineView from './UserBaselineView';
import compose from '@shopify/react-compose';
import { withFindOne } from '@hocs';

const getUserBaselineFilter = ({
  userSimulationId,
  user,
}: {
  userSimulationId: string;
  user: any;
}) => {
  console.log(userSimulationId);
  return {
    _id: userSimulationId,
  };
};

const getScreenRecorderFilter = (props: any) => ({
  userSimulationId: props.userSimulationId,
});
export default compose<any>(
  withFindOne({
    collectionName: 'userSimulations',
    getFilter: getUserBaselineFilter,
    version: 2,
    storeData: true,
    storeKey: 'userSimulationStore',
  }),
  withFindOne({
    collectionName: 'screenRecorders',
    getFilter: getScreenRecorderFilter,
    version: 2,
    required: false,
    storeKey: 'screenRecorderStore',
  })
)(UserBaselineView);
