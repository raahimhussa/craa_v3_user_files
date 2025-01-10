import { withAuth, withFindOne } from '@hocs';

import ProfileView from './ProfileView';
import User from 'src/models/user';
import compose from '@shopify/react-compose';
import withMutate from 'src/hocs/withMutate';

export default compose<any>(withMutate(), withAuth)(ProfileView);
