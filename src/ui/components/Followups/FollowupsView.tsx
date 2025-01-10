import { observer } from 'mobx-react';
import Followup from 'src/ui/components/Followup/Followup';
type Followup = {
  followupId: string;
  instructionId: string;
  studyDocumentId: string;
};
function FollowupsView(props: any) {
  const {
    followups,
  }: {
    followups: Array<Followup>;
  } = props;

  const renderFollowup = (followup: Followup) => (
    <Followup followup={followup} />
  );

  return <>{followups.map(renderFollowup)}</>;
}
export default observer(FollowupsView);
