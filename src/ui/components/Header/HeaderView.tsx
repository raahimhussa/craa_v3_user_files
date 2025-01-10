import { AppBar, Box, Toolbar } from '@mui/material';
import { observer } from 'mobx-react';
import ProfileCard from './ProfileCard/ProfileCard';

function HeaderView({ state }: any) {
  const { userEmail, userPassword } = state;
  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}
      >
        <Toolbar sx={{ justifyContent: 'flex-end', width: 400 }}>
          <ProfileCard
            userEmail={userEmail}
            userPassword={userPassword}
          ></ProfileCard>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default observer(HeaderView);
