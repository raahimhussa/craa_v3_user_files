import { withFindOne } from '@hocs';
import compose from '@shopify/react-compose';
import InstructionView from './InstructionView';

const getDocFilter = ({ instructionId }: { instructionId: string }) => {
  return {
    _id: instructionId,
  };
};

export default compose<any>(
  withFindOne({
    collectionName: 'docs',
    getFilter: getDocFilter,
  })
)(InstructionView);
