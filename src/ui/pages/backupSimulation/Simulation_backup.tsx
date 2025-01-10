import { withAuth, withFindOne, withRouteParam, withState } from '@hocs';
import compose from '@shopify/react-compose';
import withMeta from './withMeta';
import withTraining from './withTraining';
import SimulationView from './SimulationView';
import { AppBarItems } from 'src/ui/components/mui/surfaces/AppBar/AppBar';
import withVideo from './withVideo';
import withTimer from './withTimer';
import withContextMenu from './withContextMenu';
type HocComponentProps = {
  user: any;
  simulationId: string;
  simulation: any;
  trainingId: string;
  trainingRoom: any;
  items: AppBarItems;
} & any;
export type SimulationProps = {};
export type SimulationViewProps = HocComponentProps & SimulationProps;
const getState = (props: any) => {
  // const { state, trainingRoom, simulation, appBarItems, screenRecorder } = props
  const { trainingRoom, simulation, appBarItems, screenRecorder } = props;

  simulation.documents.forEach((doc: any) => {
    doc.onClick = () => null;
  });

  return {
    trainingRoom: {
      appBarItems: appBarItems,
      screenRecorder: screenRecorder,
      ...trainingRoom,
      simulation: {
        ...simulation,
        timeUsedByUser: 0,
        timeRemainning: 0,
        viewports: [
          {
            notes: [],
            documents: simulation.documents,
            pdfViewer: {
              document: {},
              currentPage: 0,
              scale: 0,
              fullScreen: false,
            },
          },
          {
            notes: [],
            documents: simulation.documents,
            pdfViewer: {
              document: {},
              currentPage: 0,
              scale: 0,
              fullScreen: true,
            },
          },
        ],
      },
    },
  };
};

const getFilter = (props: any) => {
  const { simulationId } = props;
  return {
    _id: simulationId,
  };
};

export default compose(
  withVideo,
  withRouteParam,
  withAuth,
  withTraining,
  withFindOne({ collectionName: 'simulations', getFilter }),
  withTimer,
  withMeta,
  withState(getState),
  withContextMenu
)(SimulationView);
