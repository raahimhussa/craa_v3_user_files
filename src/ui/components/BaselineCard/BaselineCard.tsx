import { withAuth, withFind, withFindOne } from '@hocs';

import AssessmentType from 'src/models/assessmentType';
import BaselineView from './BaselineCardView';
import User from 'src/models/user';
import UserAssessmentCycleStore from 'src/stores/userAssessmentCycleStore';
import compose from '@shopify/react-compose';
import withREST from 'src/hocs/withREST';
import withStore from 'src/hocs/withStore';

const userBaselineFilter = ({
  userSimulationId,
}: {
  userSimulationId: string;
}) => {
  return {
    _id: userSimulationId,
  };
};

const assessmentTypePath = ({
  assessmentTypeId,
}: {
  assessmentTypeId: string;
}) => {
  return assessmentTypeId;
};

export default compose<any>(
  withAuth,
  // withFindOne({
  //   collectionName: 'simulations',
  //   getFilter: getSimulationFilter,
  // }),
  withFindOne({
    collectionName: 'userSimulations',
    getFilter: userBaselineFilter,
    version: 2,
    storeKey: 'userSimulationStore',
  }),
  withREST({
    collectionName: 'assessmentTypes',
    path: assessmentTypePath,
    storeKey: 'assessmentTypeStore',
  })
)(BaselineView);
