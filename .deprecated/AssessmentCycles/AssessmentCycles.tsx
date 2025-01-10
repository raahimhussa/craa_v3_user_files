// import { withAuth, withFind, withFindOne } from '@hocs';

// import AssessmentCyclesView from './AssessmentCyclesView';
// import User from 'src/models/user';
// import compose from '@shopify/react-compose';
// import withMeta from './withMeta';

// const getACsFilter = () => ({
//   // userId: user._id,
//   // assessmentCycleId: {
//   //   $in: businessUnit.assessmentCycleIds,
//   // },
// });

// const getBUFilter = ({ user }: { user: User }) => ({
//   _id: user.profiles[0].businessUnitId,
// });

// export default compose<any>(
//   withAuth,
//   withFindOne({
//     collectionName: 'businessUnits',
//     getFilter: getBUFilter,
//   }),
//   withFind({
//     collectionName: 'userAssessmentCycles',
//     getFilter: getACsFilter,
//   }),
//   withMeta
// )(AssessmentCyclesView);
