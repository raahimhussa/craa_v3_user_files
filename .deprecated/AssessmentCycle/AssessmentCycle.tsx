// import { withFindOne } from '@hocs';
// import compose from '@shopify/react-compose';
// import UserAssessmentCycle from 'src/models/userAssessmentCycle';
// import AssessmentCycleView from './AssessmentCycleView';

// const getACFilter = ({
//   userAssessmentCycle,
// }: {
//   userAssessmentCycle: UserAssessmentCycle;
// }) => {
//   console.log(userAssessmentCycle);
//   return {
//     _id: userAssessmentCycle.assessmentCycleId,
//   };
// };

// export default compose<any>(
//   withFindOne({
//     collectionName: 'assessmentCycles',
//     getFilter: getACFilter,
//   }),
//   withFindOne({
//     collectionName: 'sales',
//     version: 2,
//     getFilter: ({
//       userAssessmentCycle,
//     }: {
//       userAssessmentCycle: UserAssessmentCycle;
//     }) => {
//       return {
//         saleId: userAssessmentCycle.saleId,
//       };
//     },
//   })
// )(AssessmentCycleView);
