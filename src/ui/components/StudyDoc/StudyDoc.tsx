import { withFindOne } from '@hocs';
import compose from '@shopify/react-compose';
import StudyDocView from './StudyDocView';
const getDocFilter = ({ studyDocId }: { studyDocId: string }) => {
  console.log(studyDocId);
  return {
    _id: studyDocId,
  };
};

export default compose<any>(
  withFindOne({
    collectionName: 'simDocs',
    getFilter: getDocFilter,
  })
)(StudyDocView);
