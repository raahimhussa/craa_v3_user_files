import { Box } from '@components';
import { CircularProgress, LinearProgress } from '@mui/material';
import { observer } from 'mobx-react';
import { ProgressViewProps } from './Progress';
function ProgressView(props: ProgressViewProps) {
  const { linear = false } = props;
  let loading = linear ? (
    <LinearProgress {...props} sx={{ width: 300 }} />
  ) : (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress {...props} />
    </Box>
  );

  return loading;
}
export default observer(ProgressView);
