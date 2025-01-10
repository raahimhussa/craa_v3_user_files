import { withFind } from '@hocs';
import compose from '@shopify/react-compose';
import HtmlDocumentView from './HtmlDocumentView';

export default compose<any>(
  withFind({
    collectionName: 'documents',
    getFilter: (props: any) => {
      console.log(props);
      return {
        _id: props.simDoc.documentId,
        isDeleted: false,
      };
    },
  })
)(HtmlDocumentView);
