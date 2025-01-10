import { observer } from 'mobx-react';
import { AuthLayout } from '@layouts';
import { Typography, Spacer, Grid, Button, Box, TextField } from '@components';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { IconButton, InputAdornment } from '@mui/material';
import { useRootStore } from 'src/stores';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
function PasswordGeneratorView(props: any) {
  const { authStore } = useRootStore();
  const { state } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show: any) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <AuthLayout>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">Welcome to CRA Assessments!</Typography>
            <Spacer spacing={3} />
            <Typography
              sx={{
                fontSize: '14px',
                color: '#000000',
                opacity: '0.6',
              }}
            >
              Please create a password for your account. Your password must
              follow the following rules:
            </Typography>
            <Spacer spacing={3} />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                color: '#000000',
                opacity: '0.6',
                fontSize: '14px',
              }}
            >
              - At least 8characters <br />
              - One uppercase letter <br />
              - One lowercase letter <br />- One number
            </Typography>
            <Spacer spacing={3} />
            <Typography
              sx={{
                fontSize: '14px',
                color: '#000000',
                opacity: '0.6',
              }}
            >
              <span>
                To create a password, simply click in the text area and update.
              </span>
              <span
                style={{
                  color: '#FF0000',
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                }}
              >
                &nbsp; Please record your Username and Password in order to
                login to your account.
              </span>
              <br />
              <span>
                When you are done, click on `ACTIVATE` to activate your account.
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Spacer spacing={5} />
        <Grid container spacing={2}>
        <Grid item xs={6}>
            <TextField
              disabled={true}
              state={state}
              path="user.profile.firstName"
              variant="standard"
              helperText="First Name"
            />
          </Grid>          
          <Grid item xs={6}>
            <TextField
              disabled={true}
              state={state}
              path="user.profile.lastName"
              variant="standard"
              helperText="Last Name"
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled={true}
              state={state}
              path="user.email"
              variant="standard"
              helperText="Email"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled={true}
              state={state}
              path="user.name"
              variant="standard"
              helperText="Username"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={state.isError ? true : false}
              label="Password"
              helperText="Required"
              state={state}
              path="user.password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type={showPassword ? 'text' : 'password'}
              error={state.isError ? true : false}
              label="Confirm Password"
              helperText="Required"
              state={state}
              path="user.passwordConfirm"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
        </Grid>
        <Spacer spacing={3} />
        <Button
          onClick={() => authStore.signup(state.user)}
          variant="contained"
          sx={{
            color: '#ffffff',
            backgroundColor: '#377485',
            height: '44px',
          }}
        >
          ACTIVATE
        </Button>
      </AuthLayout>
    </>
  );
}
export default observer(PasswordGeneratorView);
