import { withFindOne } from '@hocs';
import compose from '@shopify/react-compose';
import TutorialView from './TutorialView';
export default compose<any>(
  withFindOne({
    collectionName: 'assessmentCycles',
    getFilter: (props: any) => ({ _id: props.assessmentCycleId })
  })
)(TutorialView);
