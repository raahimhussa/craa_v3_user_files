import compose from '@shopify/react-compose';
import withPayload from 'src/hocs/withPayload';
import NoteModalView from './NoteModalView';
export default compose<any>(withPayload('note'))(NoteModalView);
