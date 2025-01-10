import { observer } from 'mobx-react';
// import { Alert } from '@mui/material'
import { Typography } from '@components';
import { Alert } from '@mui/material';

function UpdateAlertsView({ ...rest }: any) {
  return (
    <>
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="subtitle1" fontWeight={500}>
          Maintenance and update
        </Typography>
        <Typography variant="body2">
          CRA Assessments will be unavailable every <br />
          Saturday from 1 a.m - 2 a.m. (EST) for <br />
          maintenance and updates.
        </Typography>
      </Alert>
    </>
  );
}
export default observer(UpdateAlertsView);
