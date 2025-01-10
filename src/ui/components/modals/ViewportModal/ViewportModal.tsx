import { withFindOne } from '@hocs';
import compose from '@shopify/react-compose';
import withPayload from 'src/hocs/withPayload';
import ViewportModalView from './ViewportModalView';
export default compose<any>(
  withPayload('viewport'),
  withFindOne({
    collectionName: 'simulations',
    getFilter: (props: any) => ({
      _id: props.simulationId,
    }),
  })
)(ViewportModalView);
