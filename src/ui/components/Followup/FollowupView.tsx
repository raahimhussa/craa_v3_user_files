import { observer } from 'mobx-react';
import Accordian from '../Accordian/Accordian';
function FollowupView(props: any) {
  const { followup } = props;
  return <Accordian item={followup} />;
}
export default observer(FollowupView);
