import { withState } from '@hocs';
import compose from '@shopify/react-compose';
import PDFControllerView from './PDFControllerView';
import withKeyEvent from './withKeyEvent';

const getLocalState = () => ({
  scale: 1,
});

export default compose<any>(
  withState(getLocalState),
  withKeyEvent
)(PDFControllerView);
