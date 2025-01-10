// import { withFind } from '@hocs'
import compose from '@shopify/react-compose';
import InstructionsView from './InstructionsView';

// const getInstructionsFilter = ({
//   instructionIds
// }: {
//   instructionIds: string[]
// }) => {
//   return ({
//     _id: {
//       $in: instructionIds
//     }
//   })
// }

export default compose<any>()(InstructionsView);
// withFind({
//   collectionName: 'docs',
//   getFilter: getInstructionsFilter
// })
