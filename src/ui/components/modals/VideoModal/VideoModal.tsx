import { withFindOne, withFind } from '@hocs';
import compose from '@shopify/react-compose';
import withPayload from 'src/hocs/withPayload';
import VideoModalView from './VideoModalView';
export default compose<any>(
  withPayload('video'),
  withFindOne({
    collectionName: 'assessmentCycles',
    getFilter: (props: any) => ({ _id: props.assessmentCycleId }),
  }),
  withFind({
    collectionName: 'tutorials',
    version: 2,
    getFilter: (props: any) => ({}),
  })
)(VideoModalView);
