import { observer } from 'mobx-react';
import StudyDoc from '../../StudyDoc/StudyDoc';

function StudyDocModalView({ studyDocId = '' }: { studyDocId: string }) {
  return <StudyDoc studyDocId={studyDocId} />;
}

export default observer(StudyDocModalView);
