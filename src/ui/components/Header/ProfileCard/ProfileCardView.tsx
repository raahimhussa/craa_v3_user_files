import { observer } from 'mobx-react';
import { Button } from '@components';
import {
  Avatar,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Popover,
  Divider,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useUser } from '@hooks';
import { useRootStore } from 'src/stores';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import _ from 'lodash';
import customTheme from 'src/ui/theme/customizedTheme';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ProfileCardView({
  button = null,
  isLogoutButtonVisible = true,
  isViewport = false,
}: any) {
  const { data: user } = useUser();
  const { authStore, routerStore } = useRootStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!isViewport) {
    return (
      <Box
        sx={
          {
            // display: 'flex',
            // alignItems: 'center',
            // flex: 1,
            // backgroundColor: 'black',
          }
        }
      >
        {user?._id ? (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* <Avatar
                sx={{
                  width: '22px',
                  height: '22px',
                  mx: 1,
                }}
              /> */}
              {/* <PersonIcon sx={{ color: '#666666', mr: 1, fontSize: '1.3rem' }} /> */}

              <IconButton
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  color:
                    anchorEl == null
                      ? 'white'
                      : customTheme.craa?.palette.light,
                  p: 0,
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  mr: 2,
                }}
              >
                {/* {user.name} */}
                <AccountCircleIcon />
              </IconButton>
            </Box>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              onClick={() => routerStore.go('/auth/signin')}
            >
              Login
            </Button>
            <Button
              color="inherit"
              onClick={() => routerStore.go('/auth/signup')}
            >
              SignUp
            </Button>
          </>
        )}
        <Box sx={{}}>
          <Popover
            id="basic-menu"
            className="popover"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            // MenuListProps={{
            //   'aria-labelledby': 'basic-button',
            // }}
            // sx={{ mt: 3 }}
          >
            {routerStore?.router?.pathname === '/profile' ? (
              <MenuItem
                sx={{ bgcolor: 'white' }}
                onClick={() => {
                  routerStore.go('/home');
                }}
              >
                Home
              </MenuItem>
            ) : (
              <MenuItem
                sx={{ bgcolor: 'white' }}
                onClick={() => {
                  routerStore.go('/profile');
                }}
              >
                Profile
              </MenuItem>
            )}
            {user?.role.title === 'SimUser' ? (
              <>
                <Divider />
                <MenuItem
                  onClick={() => {
                    authStore.logout();
                  }}
                  sx={{ bgcolor: 'white' }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <></>
            )}
          </Popover>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          // backgroundColor: 'black',
        }}
      >
        {user?._id ? (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                px: 0,
                py: 0,
                borderRadius: '8px',
                mr: 1,
              }}
            >
              <Avatar
                sx={{
                  width: '15px',
                  height: '15px',
                  mx: 1,
                  backgroundColor: '#999999',
                }}
              />
              {/* <PersonIcon sx={{ color: '#666666', mr: 1, fontSize: '1.3rem' }} /> */}
              <Typography
                sx={{ fontSize: '0.75rem', mr: 1, fontWeight: 500 }}
                variant="button"
                color={'#637381'}
              >
                {user.name}
              </Typography>
            </Box>
            {isLogoutButtonVisible && user.role.title === 'SimUser' && (
              <Button
                startIcon={<LogoutIcon htmlColor="#666666" />}
                fullWidth={false}
                onClick={() => {
                  authStore.logout();
                }}
                sx={{
                  color: '#666666',
                  backgroundColor: 'rgb(244, 246, 248)',
                  py: 0,
                  px: 2,
                  borderRadius: '10px',
                  fontWeight: 400,
                  fontSize: '0.85rem',
                  '&:hover': {
                    backgroundColor: '#e0e6eb',
                  },
                }}
              >
                Logout
              </Button>
            )}
            {button}
          </>
        ) : (
          <>
            <Button
              color="inherit"
              onClick={() => routerStore.go('/auth/signin')}
            >
              Login
            </Button>
            <Button
              color="inherit"
              onClick={() => routerStore.go('/auth/signup')}
            >
              SignUp
            </Button>
          </>
        )}
      </Box>
    );
  }
}
export default observer(ProfileCardView);
