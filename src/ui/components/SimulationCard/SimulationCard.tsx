import { withAuth, withFind } from '@hocs';

import SimulationCardView from './SimulationCardView';
import UserAssessmentCycle from 'src/models/userAssessmentCycle';
import compose from '@shopify/react-compose';
import withMutate from 'src/hocs/withMutate';
import withREST from 'src/hocs/withREST';

export default compose<any>(
  withMutate(),
  withREST({
    collectionName: 'clientUnits',
    path: ({
      userAssessmentCycle,
    }: {
      userAssessmentCycle: UserAssessmentCycle;
    }) => {
      const { clientUnitId, businessUnitId, businessCycleId } =
        userAssessmentCycle;
      return `${clientUnitId}/${businessUnitId}/${businessCycleId}`;
    },
    propName: 'businessCycle',
  })
  // withAuth
)(SimulationCardView);
