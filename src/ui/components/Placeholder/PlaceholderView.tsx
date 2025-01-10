import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
function PlaceholderView({
  text = 'Please select document from dropdown list in the top left of the viewport.',
}: {
  text: string;
}) {
  const { uiState } = useRootStore();
  return (
    <Box
      sx={{
        display: 'flex',
        // flex: 1,
        // height: uiState.windowDimensions.height,
        height: '100%',
        // border: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#525659',
        flexDirection: 'column',
      }}
    >
      <Typography color={'white'} variant="h3">
        CRA Assessments
      </Typography>
      <Typography color={'white'} variant="h6">
        {text}
      </Typography>
    </Box>
  );
}
export default observer(PlaceholderView);
