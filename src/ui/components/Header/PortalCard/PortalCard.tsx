import compose from '@shopify/react-compose';
import withMutate from 'src/hocs/withMutate';
import PortalCardView from './PortalCardView';
export default compose<any>(withMutate())(PortalCardView);
