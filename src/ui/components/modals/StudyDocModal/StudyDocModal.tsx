import compose from '@shopify/react-compose';
import withPayload from 'src/hocs/withPayload';
import StudyDocModalView from './StudyDocModalView';
export default compose<any>(withPayload('studyDoc'))(StudyDocModalView);
