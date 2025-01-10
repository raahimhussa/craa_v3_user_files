import { Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import policy from './Policy';

const Privacy = () => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 80px)',
        overflowY: 'auto',
        px: 10,
      }}
    >
      <ReactMarkdown>{policy}</ReactMarkdown>
    </Box>
  );
};
export default Privacy;
