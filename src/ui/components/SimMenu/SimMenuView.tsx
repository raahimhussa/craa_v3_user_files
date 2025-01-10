import 'react-calendar/dist/Calendar.css';

import { Button, IconButton, Menu, Paper } from '@mui/material';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';
import { Offline, Online } from 'react-detect-offline';
import { green, grey, red } from '@mui/material/colors';

import Box from '@mui/material/Box';
import ProfileCard from '../Header/ProfileCard/ProfileCard';
import Swal from 'sweetalert2';
import Timer from '../Timer/Timer';
import Typography from '../Typography/Typography';
import { observer } from 'mobx-react';
import uniqid from 'uniqid';
import { useRootStore } from 'src/stores';
import { SimEvent } from 'src/models/log/types';
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';

function MenuView({ leftButtons }: any) {
  const {
    routerStore,
    screenRecorderStore,
    viewportStore,
    uiState,
    logStore,
    uiState: { userSimulation, baselineCard },
  } = useRootStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const renderButton = (button: any) => {
    if (!button.isVisible) return null;
    return (
      <Button
        key={uniqid()}
        size="small"
        onClick={button.onClick}
        variant="outlined"
        sx={{
          whiteSpace: 'nowrap',
          mr: 1,
          // bgcolor: 'rgba(145, 158, 171, 0.12)',
          bgcolor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          color: '#3d4042',
          borderRadius: '7px',
          fontSize: '0.75rem',
          py: '0',
          px: '0.5rem',
          height: '20px',
          '&:hover': {
            bgcolor: 'white',
            boxShadow: 'none',
            border: 'none',
          },
        }}
      >
        {button.text}
      </Button>
    );
  };

  return (
    <Box
      sx={{
        background: '#f2f2f3',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        height: '30px',
      }}
    >
      <Box sx={{ display: 'flex', flex: 1, ml: 2, alignItems: 'center' }}>
        <Button
          disabled={screenRecorderStore.isVideoSaving}
          className="home"
          sx={{
            mr: 2,
            bgcolor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            color: '#3d4042',
            borderRadius: '7px',
            fontSize: '0.75rem',
            py: '0',
            px: '0',
            height: '20px',
            '&:hover': {
              bgcolor: 'white',
              boxShadow: 'none',
              border: 'none',
            },
          }}
          onClick={() => {
            Swal.fire({
              title: 'Warning!',
              text: 'Are you sure you want to stop the simulation?',
              icon: 'warning',
              confirmButtonText: 'Yes',
              confirmButtonColor: green[500],
              cancelButtonText: 'Cancel',
              cancelButtonColor: 'red',
              showCancelButton: true,
              heightAuto: false,
            }).then((result) => {
              if (result.isConfirmed) {
                // viewportStore.save(uiState.simulationMode);
                screenRecorderStore.stop(true);
                viewportStore.viewports[2].active = false;
                viewportStore.viewportRepository.update({
                  filter: {
                    _id: viewportStore.viewports[2]._id,
                  },
                  update: {
                    active: false,
                  },
                });
                logStore.create(SimEvent.OnClickHome);
                routerStore.go('/home');
                baselineCard.mutate && baselineCard.mutate();
                userSimulation.mutate && userSimulation.mutate();
              }
            });
          }}
          size="small"
          variant="outlined"
        >
          Home
        </Button>
        {leftButtons?.map(renderButton)}
        <Button
          className="home"
          sx={{
            mr: 2,
            bgcolor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            color: '#3d4042',
            borderRadius: '7px',
            fontSize: '0.75rem',
            py: '0',
            px: '0',
            height: '20px',
            '&:hover': {
              bgcolor: 'white',
              boxShadow: 'none',
              border: 'none',
            },
          }}
          onClick={handleClick}
          size="small"
          variant="outlined"
        >
          Calendar
        </Button>
        <Menu
          id="calendar"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <Calendar locale="en-GB" />
        </Menu>
      </Box>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Timer />
        {/* {screenRecorderStore.mediaStream != null ? : <></>} */}
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Paper
          sx={{
            bgcolor: grey[500],
            py: 0,
            borderRadius: '8px',
            px: 1,
            mr: 1,
            boxShadow: 'none',
          }}
        >
          <Typography
            sx={{ color: 'white', fontWeight: 700, fontSize: '0.8rem' }}
          >
            {process.env.NODE_ENV === 'production' ? 'Beta' : 'Dev'}
          </Typography>
        </Paper>
        <Online>
          <Paper
            sx={{
              bgcolor: green[500],
              py: 0,
              borderRadius: '8px',
              px: 1,
              mr: 1,
              boxShadow: 'none',
            }}
          >
            <Typography
              sx={{ color: 'white', fontWeight: 700, fontSize: '0.8rem' }}
            >
              Online
            </Typography>
          </Paper>
        </Online>
        <Offline>
          <Paper
            sx={{
              bgcolor: red[500],
              py: 0,
              borderRadius: '8px',
              px: 1,
              mr: 2,
              boxShadow: 'none',
            }}
          >
            <Typography
              sx={{ color: 'white', fontWeight: 700, fontSize: '0.8rem' }}
            >
              Online
            </Typography>
          </Paper>
        </Offline>
        <Box>
          <ProfileCard isLogoutButtonVisible={false} isViewport={true} />
        </Box>

        {viewportStore.isBrowserFullscreen ? (
          <IconButton
            onClick={async () => {
              viewportStore.isBrowserFullscreen = false;
              document.exitFullscreen();
              await logStore.create(SimEvent.OnClickScreenModeChange);
            }}
          >
            <FullscreenExit htmlColor="#3d4042" fontSize="large" />
          </IconButton>
        ) : (
          <IconButton
            onClick={async () => {
              viewportStore.isBrowserFullscreen = true;
              document.documentElement.requestFullscreen();
              await logStore.create(SimEvent.OnClickScreenModeChange);
            }}
          >
            <Fullscreen htmlColor="#3d4042" fontSize="large" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default observer(MenuView);
