// import { withFindOne } from '@hocs';
import compose from '@shopify/react-compose';
import ViewportView from './ViewportView';
// const getViewportFilter = ({ viewportId }: { viewportId: string }) => {
//   return {
//     _id: viewportId,
//   };
// };

export default compose<any>(
  // withFindOne({
  //   collectionName: 'viewports',
  //   getFilter: getViewportFilter,
  //   version: 2,
  // })
)(ViewportView);
