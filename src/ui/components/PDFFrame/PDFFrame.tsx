import { withState } from '@hocs';
import compose from '@shopify/react-compose';
import withMutate from 'src/hocs/withMutate';
import withRepository from 'src/hocs/withRepository';
import PDFFrameView from './PDFFrameView';
import withHandler from './withHandler';

export default compose<any>(
  // withState(getLocalState, 'localState'),
  withRepository('viewportRepository'),
  // withMutate(),
  withHandler
)(PDFFrameView);
