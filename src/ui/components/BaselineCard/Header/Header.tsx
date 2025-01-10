import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { observer } from 'mobx-react';

function BaselineView({
  protocol = true,
  instruction = true,
  studyDoc = true,
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {protocol && (
        <Box
          sx={{
            width: '33%',
            lineHeight: 2,
            textAlign: 'center',
            bgcolor: grey[100],
            fontWeight: 500,
          }}
        >
          Instructions
        </Box>
      )}
      {instruction && (
        <Box
          sx={{
            width: '33%',
            lineHeight: 2,
            textAlign: 'center',
            bgcolor: grey[100],
            fontWeight: 500,
          }}
        >
          Protocols
        </Box>
      )}
      {studyDoc && (
        <Box
          sx={{
            width: '33%',
            lineHeight: 2,
            textAlign: 'center',
            bgcolor: grey[100],
            fontWeight: 500,
          }}
        >
          StudyDocuments
        </Box>
      )}
    </Box>
  );
}
export default observer(BaselineView);
