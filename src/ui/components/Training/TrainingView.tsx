import { observer } from 'mobx-react';
import Accordian from '../Accordian/Accordian';
function TrainingView(props: any) {
  const { training } = props;
  return <Accordian item={training} />;
}
export default observer(TrainingView);
