import { withState } from '@hocs';
import compose from '@shopify/react-compose';
import withMutate from 'src/hocs/withMutate';
import withRepository from 'src/hocs/withRepository';
import ToolbarView from './ToolbarView';
import withHandler from './withHandler';

const getState = () => ({
  fullscreen: false,
});

export default compose<any>(
  withState(getState),
  withRepository('viewportRepository'),
  withMutate(),
  withHandler
)(ToolbarView);
