// import { AssessmentCycle } from 'src/models/assessmentCycle';
// import AssessmentType from 'src/models/assessmentType';
// import BaselineCard from '../BaselineCard/BaselineCard';
// import { Mode } from './types';
// import Simulation from '../Simulation/Simulation';
// import { SimulationMode } from 'src/stores/ui';
// import { observer } from 'mobx-react';
// import { useRootStore } from 'src/stores';

// function AssessmentTypeView({
//   mode = Mode.Card,
//   assessmentCycle,
// }: // sale
// {
//   mode: Mode;
//   assessmentType?: AssessmentType;
//   assessmentCycle?: AssessmentCycle;
//   // sale?: any
// }) {
//   const {
//     assessmentTypeStore: { assessmentType },
//     uiState: { simulationMode },
//     userSimulationStore: { userSimulation },
//   } = useRootStore();
//   const isBaseline = simulationMode === SimulationMode.Baseline;

//   let isCardMode = mode === Mode.Card;
//   return isCardMode ? (
//     <BaselineCard
//       assessmentType={assessmentType}
//       assessmentCycle={assessmentCycle}
//     />
//   ) : (
//     <Simulation
//       simulationId={
//         isBaseline
//           ? assessmentType?.baseline?.simulationId
//           : assessmentType?.followups.find(
//               (followup) => userSimulation?.domainId === followup.domain._id
//             )?.simulationId
//       }
//     />
//   );
// }
// export default observer(AssessmentTypeView);
