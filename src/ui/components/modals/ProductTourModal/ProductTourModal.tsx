import { withFindOne, withFind } from '@hocs';
import compose from '@shopify/react-compose';
import withPayload from 'src/hocs/withPayload';
import ProductTourModalView from './ProductTourModalView';
export default compose<any>(
  withPayload('video'),
  withFindOne({
    collectionName: 'assessmentCycles',
    getFilter: (props: any) => ({ _id: props.assessmentCycleId }),
  })
)(ProductTourModalView);
