import { withRouteParam } from '@hocs';
import compose from '@shopify/react-compose';
import UserFollowupView from './UserFollowupView';
export default compose<any>(
  withRouteParam
)(UserFollowupView);
