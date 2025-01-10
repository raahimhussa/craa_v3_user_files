import compose from '@shopify/react-compose';
import withPayload from 'src/hocs/withPayload';
import InstructionModalView from './InstructionModalView';
export default compose<any>(withPayload('instruction'))(InstructionModalView);
