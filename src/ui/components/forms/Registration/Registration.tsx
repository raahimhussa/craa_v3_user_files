import { withFind, withFindOne } from '@hocs';

import RegistrationView from './RegistrationView';
import compose from '@shopify/react-compose';
import withHandler from './withHandler';

export default compose<any>(
  withFind({ collectionName: 'countries' }),
  withFindOne({ collectionName: 'roles', getFilter: () => ({ priority: 6 }) }),
  withHandler
)(RegistrationView);
