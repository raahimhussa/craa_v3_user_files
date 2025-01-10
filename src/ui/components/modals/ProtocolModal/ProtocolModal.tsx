import compose from '@shopify/react-compose';
import withPayload from 'src/hocs/withPayload';
import ProtocolModalView from './ProtocolModalView';
export default compose<any>(withPayload('protocol'))(ProtocolModalView);
