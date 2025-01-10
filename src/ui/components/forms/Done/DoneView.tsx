import { Spacer, Typography } from '@components';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react';
function DoneView({ ...rest }: any) {
  return (
    <Box>
      <Typography variant="h6" color="#377485" sx={{ fontWeight: 600 }}>
        Acceptance Notice
      </Typography>
      <Spacer spacing={4} />
      <Typography>
        {`You have accepted the CRAA Privacy Policy. \nAn email verification link has been sent to you. 
        If you do not receive the email verification message within a few minutes, \n please check your Junk/Spam email folder just in case the verification message got delivered there instead of your inbox. \n
        Please contact us at
        `}
      </Typography>

      <Typography sx={{ fontWeight: '700' }}>
        help@craassessments.com{' '}
      </Typography>
      <Typography
        sx={{
          fontWeight: '700',
          letterSpacing: '0.15px',
          textDecorationLine: 'underline',
        }}
      >
        If you do not receive the account verification email within an hour.
      </Typography>
      <Spacer spacing={5} />
    </Box>
  );
}
export default observer(DoneView);
