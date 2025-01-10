// import { Box, Button } from '@mui/material';

// import { AppBar } from '@components';
// import React from 'react';
// import UAC from 'src/models/userAssessmentCycle';
// import UserAssessmentCycle from 'src/ui/components/UserAssessmentCycle/UserAssessmentCycle';
// import { observer } from 'mobx-react';
// import uniqid from 'uniqid';
// import { useRootStore } from 'src/stores';

// function AssessmentCyclesView(props: any) {
//   const { items, userAssessmentCycles = {}, user } = props;
//   const { userSimulationStore } = useRootStore();
//   const renderUserAC = (userAssessmentCycle: UAC) => {
//     return (
//       <Box>
//         <Button
//           onClick={() => userSimulationStore.userSimulation?.resetForTest()}
//         >
//           Reset(For Dev)
//         </Button>
//         <UserAssessmentCycle
//           key={uniqid()}
//           userAssessmentCycle={userAssessmentCycle}
//           userSimulationId={userAssessmentCycle.userSimulationId}
//           user={user}
//         />
//       </Box>
//     );
//   };

//   return (
//     <AppBar items={items}>{userAssessmentCycles.map(renderUserAC)}</AppBar>
//   );
// }

// export default observer(AssessmentCyclesView);
