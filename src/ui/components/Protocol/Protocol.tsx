import { withFindOne } from '@hocs';
import compose from '@shopify/react-compose';
import ProtocolView from './ProtocolView';
const getDocFilter = ({ protocolId }: { protocolId: string }) => {
  return {
    _id: protocolId,
  };
};

export default compose<any>(
  withFindOne({
    collectionName: 'docs',
    getFilter: getDocFilter,
  })
)(ProtocolView);
