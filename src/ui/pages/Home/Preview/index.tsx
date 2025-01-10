import { Box, Paper, Button } from '@mui/material';

import Answer from 'src/models/answer';
import Assessment from 'src/models/assessment';
import ComplianceCalculationScore from './sections/ComplianceCalculationScore';
import Domain from 'src/models/domain';
import Finding from 'src/models/finding';
import FindingScore from './sections/FindingScore';
import MonitoringNotes from './sections/MonitoringNotes';
import ProcessIssues from './sections/ProcessIssues';
import ResultsSummary from './sections/ResultsSummary';
import UnidentifiedFindings from './sections/UnidentifiedFindings';
import UserInfo from './sections/UserInfo';
import UserSimulation from 'src/models/userSimulation';
import compose from '@shopify/react-compose';
import { observer } from 'mobx-react';
import withFind from 'src/hocs/withFind';
import withFindOne from 'src/hocs/withFindOne';
import { useState } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import customTheme from 'src/ui/theme/customizedTheme';

const PreviewView = ({
  userSimulation,
  answers,
  findings,
  domains,
  countries,
  setOpenPreview,
  simulations
}: {
  userSimulation: UserSimulation;
  answers: Answer[];
  findings: Finding[];
  domains: Domain[];
  countries: any[];
  setOpenPreview: any;
  simulations: any[];
}) => {
  console.log(userSimulation);

  return (
    <Box
      sx={{
        overflow: 'auto',
        maxHeight: 'calc(100vh - 45px)',
        bgcolor: 'white',
      }}
    >
      <Paper sx={{ p: 4, px: 10 }}>
        <Box sx={{ mb: 6 }}>
          <UserInfo
            userId={userSimulation.userId}
            countries={countries}
            userSimulation={userSimulation}
            simulations={simulations}
          />
        </Box>
        <Box sx={{ mb: 6 }}>
          <ResultsSummary userSimulation={userSimulation} />
        </Box>
        <Box sx={{ mb: 6 }}>
          <FindingScore userSimulation={userSimulation} domains={domains} />
        </Box>
        <Box sx={{ mb: 6 }}>
          <ComplianceCalculationScore
            userSimulationId={userSimulation._id}
            userId={userSimulation.userId}
          />
        </Box>
        <Box sx={{ mb: 6 }}>
          <ProcessIssues userSimulationId={userSimulation._id} />
        </Box>
        <Box sx={{ mb: 6 }}>
          <UnidentifiedFindings
            userSimulation={userSimulation}
            answers={answers}
            findings={findings}
            domains={domains}
          />
        </Box>
        <Box>
          <MonitoringNotes
            userSimulationId={userSimulation._id}
            userId={userSimulation.userId}
          />
        </Box>
      </Paper>
    </Box>
  );
};
export default compose<any>(
  withFindOne({
    collectionName: 'userSimulations',
    version: 2,
    getFilter: ({ userSimulationId }: { userSimulationId: string }) => ({
      _id: userSimulationId,
    }),
  }),
  withFind({
    collectionName: 'answers',
    version: 2,
    getFilter: ({ userSimulationId }: { userSimulationId: string }) => ({
      userSimulationId: userSimulationId,
    }),
  }),
  withFind({
    collectionName: 'findings',
    version: 2,
    getOptions: ({ simId }: { simId: string }) => ({
      // fields: {
      //   selectedSimulationId: simId,
      // },
      withJoin: true,
    }),
  }),
  withFind({
    collectionName: 'domains',
    version: 2,
    getFilter: () => ({}),
  }),
  withFind({
    collectionName: 'countries',
    getFilter: () => ({}),
  }),
  withFind({
    collectionName: 'simulations',
    getFilter: () => {
      return {
        isDeleted: false
      }
    }
  })
)(observer(PreviewView));
