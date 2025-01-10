import { withFind } from '@hocs';
import compose from '@shopify/react-compose';
import StudyDocsView from './StudyDocsView';

const getStudyDocsFilter = ({ studyDocIds }: { studyDocIds: string[] }) => {
  return {
    _id: {
      $in: studyDocIds,
    },
  };
};

export default compose<any>(
  withFind({
    collectionName: 'simDocs',
    getFilter: getStudyDocsFilter,
  })
)(StudyDocsView);
