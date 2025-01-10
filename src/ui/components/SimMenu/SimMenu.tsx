import compose from '@shopify/react-compose';
import withMutate from 'src/hocs/withMutate';
import SimMenuView from './SimMenuView';
import { MenuProps } from './types';
import withMeta from './withMeta';
export default compose<MenuProps>(
  withMutate(),
  withMeta,
)(SimMenuView);
