import { observer } from 'mobx-react';
import Training from 'src/ui/components/Training/Training';
type Training = {
  trainingId: string;
  instructionId: string;
  studyDocumentId: string;
};
function TrainingsView(props: any) {
  const {
    trainings,
  }: {
    trainings: Array<Training>;
  } = props;

  const renderTraining = (training: Training) => (
    <Training training={training} />
  );

  return <>{trainings.map(renderTraining)}</>;
}
export default observer(TrainingsView);
