import { withState } from '@hocs';
import compose from '@shopify/react-compose';
import withMutate from 'src/hocs/withMutate';
import NormalView from './NormalView';
import withColumns from './withColumns';
import withLeftButtons from './withLeftButtons';
import withRightButtons from './withRightButtons';

const getState = (props: any) => ({
  selectedRowIds: [],
});

export default compose<any>(
  withState(getState),
  withColumns,
  withMutate(),
  withLeftButtons,
  withRightButtons
)(NormalView);
