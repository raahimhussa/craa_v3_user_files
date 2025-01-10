import { withFind } from '@hocs';
import compose from '@shopify/react-compose';
import ProtocolsView from './ProtocolsView';

const getProtocolsFilter = ({ protocolIds }: { protocolIds: string[] }) => {
  return {
    _id: {
      $in: protocolIds,
    },
  };
};

export default compose<any>(
  withFind({
    collectionName: 'docs',
    getFilter: getProtocolsFilter,
  })
)(ProtocolsView);
