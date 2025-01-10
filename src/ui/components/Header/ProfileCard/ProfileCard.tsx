import compose from '@shopify/react-compose';
import withMutate from 'src/hocs/withMutate';
import withHandler from './withHandler';
import ProfileCardView from './ProfileCardView';
export default compose<any>(withMutate(), withHandler)(ProfileCardView);
