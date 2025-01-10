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
import LanguageIcon from '@mui/icons-material/Language';
function PortalCardView({
  button = null,
  isLogoutButtonVisible = true,
  isViewport = false,
}: any) {
  const { data: user } = useUser();
  const { authStore, routerStore } = useRootStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const mode = process.env.NODE_ENV;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (user.role.title !== 'SimUser') {
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
                  mr: 2.5,
                }}
              >
                {/* {user.name} */}
                <LanguageIcon />
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
            <MenuItem
              onClick={() => {
                window.location.href =
                  mode === 'production'
                    ? 'https://craa-admin-dev-3.hoansoft.com/'
                    : 'http://localhost:3001/';
              }}
              sx={{ bgcolor: 'white' }}
            >
              Admin
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.href =
                  mode === 'production'
                    ? 'https://craa-client-dev-3.hoansoft.com/'
                    : 'http://localhost:3002/';
              }}
              sx={{ bgcolor: 'white' }}
            >
              Client
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.href =
                  mode === 'production'
                    ? 'https://craa-training-dev-3.hoansoft.com/training-admin/console/assets/trainings/all'
                    : 'http://localhost:8084/training-admin/console/assets/trainings/all';
              }}
              sx={{ bgcolor: 'white' }}
            >
              Training
            </MenuItem>
          </Popover>
        </Box>
      </Box>
    );
  } else {
    return <></>;
  }
}
export default observer(PortalCardView);
