import React, { useState } from 'react';
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { Button, Grid, TextField, Typography } from 'src/ui/components';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
import { runInAction } from 'mobx';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; // Import the icon you want to use

import { isValidEmail } from 'src/utils/helpers';

interface SigninViewProps {
  signIn: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPasswordReset: Function; // same here
  onBackToSignin: Function;
  mode: string,
}

const SigninView: React.FC<SigninViewProps> = ({ signIn, onPasswordReset, onBackToSignin, mode }) => {  
  const { authStore } = useRootStore();
  const [forgotPassword, setForgotPassword] = useState(mode === 'passwordReset'); // Add this state variable
  const [warningMessage, setWarningMessage] = useState(''); // Warning state for empty email

  const textStyle = {
    borderColor: 'white',
    backgroundColor: 'rgb(242, 242, 242) !important',
  };

  // Handle click event on the forgot password link.
  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Set the state of 'forgotPassword' to true to show the forgot password component on the page.
    setForgotPassword(true);
    
    // Call the function in SignInView page to display password-reset title and message
    onPasswordReset();
  }

  // This function is called when the user submits a request to reset their password.
  const handlePasswordReset = async () => {
    // Check if email is provided before proceeding.
    if(!authStore.forgotPasswordUser.email) {
      setWarningMessage('Please provide an email.');
      return;
    }
    
    // Hide warning message since valid email has been provided.
    setWarningMessage('');
    
    try {
      // Call an asynchronous function in mobx state management library to send password reset email.
      const isSuccess = await runInAction(() => authStore.sendPasswordResetEmail());
      
      // Display success or error message based on whether the password reset email was successfully sent or not.
      if(isSuccess) {
        // Show success message
      } else {
        // Show error message
      }
    } catch (e) {
      console.error(e);
    }
  }

  // This function is called when the user types something in the email input field.
  // const handleEmailInputChange = (e: { target: { value: string; }; }) => {
  const handleEmailInputChange = (email:  string) => {
    
    if(email === '') {
      setWarningMessage('Please provide an email.');
      return;
    }
    // Check if email is in valid format
    // if (!isValidEmail(e?.target?.value ?? '')) {
    if (!isValidEmail(email)) {
        setWarningMessage('Invalid email format');
        return;
    } else {
      setWarningMessage('');
    }
    
    // Set user's email in mobx state management library.
    // authStore.setForgotPasswordUserField('email', e?.target?.value ?? '');
    authStore.setForgotPasswordUserField('email', email);
  };

  // This function is called when the user wants to go back to the sign in screen.
  const handleBackToSignIn = () => {
    // Hide warning message and set Forgot Password state to false.
    setWarningMessage('');
    setForgotPassword(false);
    
    // Call a function in the SignInView page to navigate user back to sign in screen 
    // with proper title and message
    onBackToSignin()
  }


  return (
    <div>
      {!forgotPassword ? (
      <>
      <Stack spacing={3}>
        {/* {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>} */}

        <TextField
          className="sign-input"
          state={authStore.signInUser}
          path="usernameOrEmail"
          name="username"
          variant="outlined"
          label="Username or Email"
          sx={textStyle}
        />

        <TextField
          className="sign-input"
          state={authStore.signInUser}
          path="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          sx={textStyle}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 2, mt: 0.5 }}
      >
        {/* <RHFCheckbox name="remember" label="Remember me" /> */}
        <Link
          href={'/auth/forgot-password'} //-- dummy just for link style...any path can work
          variant="subtitle2"
          onClick={handleForgotPasswordClick}
          sx={{
            color: '#396d82',
            textDecoration: 'none',
          }}
        >
          Forgot password?
        </Link>
      </Stack>

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={signIn}
        sx={{
          borderRadius: '4px !important',
          color: 'white',
          fontWeight: 700,
          fontSize: '0.8rem',
          boxShadow: '0 8px 16px 0 rgb(83 172 169 / 24%)',
          padding: '11px 22px',
          bgcolor: '#58a7c9 !important',
          '&:hover': {
            boxShadow: '0 8px 16px 0 rgb(83 172 169 / 24%) !important',
            bgcolor: '#4e96b5 !important',
          },
        }}
      >
        Login
      </Button>
      </>
      ): (
        <>
         <Stack spacing={3}>
         <TextField
          className="sign-input"
          state={authStore.forgotPasswordUser}
          path="email"
          name="email"
          variant="outlined"
          label="Email"
          sx={textStyle}
          onChange={handleEmailInputChange}
        />
          </Stack>          

          {warningMessage && <Alert severity="warning">{warningMessage}</Alert>}

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handlePasswordReset}
          >
            Reset Password
          </Button>  

          <Link
            onClick={handleBackToSignIn}
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              mt: 1,
              cursor: 'pointer',
              marginTop: '1.1em',
              fontSize: '0.9em'
            }}
          >
            <ArrowBackIosIcon sx={{ mr: 0.3, fontSize: '0.7em' }} />
            Back to Sign-In
          </Link>               
        </>
      )}
    </div>
  );
}
export default observer(SigninView);
