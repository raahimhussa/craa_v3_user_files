import { FC, useEffect, useState } from 'react';
import QRCode from 'qrcode';
import axios from 'axios';
import { useRootStore } from 'src/stores';
import {
  Card,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  InputLabel,
} from '@mui/material';
import customTheme from 'src/ui/theme/customizedTheme';
import { useSnackbar } from 'notistack';

const TwoFactorAuth = (props: any) => {
  const [token, setToken] = useState('');
  const { authStore, routerStore } = useRootStore();

  const verifyOtp = async () => {
    const user_id = props.user_id;
    try {
      const { data } = await axios.post('v1/users/otp/verify', {
        token,
        user_id,
      });
      if (data.status === 'success') {
        //@ts-ignore
        const { res } = await authStore.signin();
        authStore.realSignIn(res);
      } else {
        alert('Please check your verification code.');
      }
    } catch (error: any) {
      alert('Please check your verification code.');
      console.log(error);
    }
  };

  return (
    <Card sx={{ p: 4, mt: -5 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Verify your 2-Step Verification Code
      </Typography>
      <Divider />
      <Typography
        sx={{
          mt: 2,
          mb: 2,
        }}
      >
        Enter the code from Google Authenticator to sign-in.
      </Typography>
      <InputLabel sx={{ mb: 1 }}>6-digit code</InputLabel>
      <TextField
        size="small"
        variant="outlined"
        onChange={(e: any) => {
          setToken(e.target.value);
        }}
      />
      <Box
        sx={{
          mt: 1,
          width: '100%',
          textAlign: 'right',
        }}
      >
        <Button variant="contained" onClick={verifyOtp}>
          Submit
        </Button>
      </Box>
    </Card>
  );
};

export default TwoFactorAuth;
