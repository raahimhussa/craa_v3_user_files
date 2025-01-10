import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react';
import Toolbar from '../../Viewport/Toolbar/Toolbar';
import Viewport from '../../Viewport/Viewport';
function ViewportView(props: any) {
  const { viewport, simulation } = props;
  return (
    <>
      <Toolbar simulation={simulation} viewport={viewport} />
      <Divider sx={{ bgcolor: 'white' }} />
      <Box
        sx={{
          height: '100%',
          minWidth: '681px !important',
          borderColor: 'white !important',
        }}
      >
        <Viewport viewportId={viewport._id} />
      </Box>
    </>
  );
}
export default observer(ViewportView);
