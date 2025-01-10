import { withAuth, withRouteParam } from '@hocs';

import SimulationView from './SimulationView';
import compose from '@shopify/react-compose';

export default compose<any>(withAuth, withRouteParam)(SimulationView);
