import { withState } from '@hocs';
import compose from '@shopify/react-compose';
import withMutate from 'src/hocs/withMutate';
import HeaderView from './HeaderView';
import withHandler from './ProfileCard/withHandler';

const getState = () => ({
  userEmail: 'USERNAME',
  userPassword: '1111',
});
export default compose<any>(withState(getState))(HeaderView);
