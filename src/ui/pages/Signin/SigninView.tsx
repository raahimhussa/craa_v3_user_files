import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { LogScreen, SimEvent } from 'src/models/log/types';
import { useEffect, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import CookieConsent from 'react-cookie-consent';
import { Copyright } from '@components';
import Image from 'next/image';
import Page from 'src/ui/components/Page';
import Privacy from './Privacy';
import { Signin } from '@forms';
import { String } from 'aws-sdk/clients/cloudsearch';
import TwoFactorAuth from './TwoFactorAuth';
import customTheme from 'src/ui/theme/customizedTheme';
import logoImg from 'public/logo/logo_full.png';
import { nullType } from 'mobx-state-tree/dist/internal';
import { observer } from 'mobx-react';
import { styled } from '@mui/material/styles';
import { useRootStore } from 'src/stores';
import { useSnackbar } from 'notistack';

import { useRouter } from 'next/router';

import { URLS } from 'src/utils/constants'

function SigninPageView() {
  const router = useRouter();

  const { authStore, logStore } = useRootStore();
  const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }));
  const [mode, setMode] = useState('signin');
  
  const [title, setTitle] = useState('Sign In'); // new state for the title
  
  const maintenanceMessage = (
    <>
      CRA Assessments will be unavailable every{' '}
      <b style={{ textDecoration: 'underline' }}>
        Saturday from 1 a.m. - 2 a.m. (EST)
      </b>{' '}
      for maintenance and updates.
    </>
  );
  const [message, setMessage] = useState(maintenanceMessage); // Use JSX as initial state

  const resetPasswordMessage = (
    <>
      Please provide your Email to get the reset link.
    </>
  );

  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [userId, setUserId] = useState('');
  const [cookieConsent, setCookieConsent] = useState('');

  const [isMounted, setIsMounted] = useState(false);

  const cdn_url = process.env.NODE_ENV === 'development' ? URLS.Local.CDN : URLS.Dev.CDN;

  // This effect will run once, right after the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    background: 'linear-gradient(135deg,#377485,#5b97a8 25%,#0a304d)',
    [theme.breakpoints.up('md')]: {      
      padding: theme.spacing(1.5, 5, 1.5, 5),
    },
  }));

  const FooterStyle = styled('header')(({ theme }) => ({
    bottom: 0,
    right: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2, 5, 2, 5),
    },
  }));

  const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
  }));

  const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 450,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
    paddingTop: 2,
  }));

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const val = localStorage.getItem('cookieConsent');
    setCookieConsent(
      //@ts-ignore
      val == null ? '' : val
    );
    
    if (isMounted) {
      if (router.query.from === 'reset-password') {
        setMode('passwordReset');
        setTitle('Reset Password');
        setMessage(resetPasswordMessage);
      }
    }    
  }, [isMounted, router.query]);

  const signIn = async () => {
    // const cookieConsent = localStorage.getItem('cookieConsent');
    // if (cookieConsent === 'rejected') {
    //   enqueueSnackbar(
    //     'You have rejected the cookie consent. Please refresh the browser and accept the cookies to use our service properly. ',
    //     {
    //       variant: 'error',
    //     }
    //   );
    //   return;
    // }
    let myIp = null;
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();
      myIp = ip;
    } catch (e) {
      console.error({ e });
      myIp = '';
    }
    try {
      //@ts-ignore
      const { res }: any = await authStore.signin(myIp);
      console.log(res)
      //@ts-ignore
      if (res?.data?.otp_enabled && res?.data?.otp_verified) {
        setUserId(res.data.user_id);
        setIsAuthenticate(true);
      } else {
        authStore.realSignIn(res);
        try {
          logStore.create(
            SimEvent.OnClickSignIn,
            LogScreen.SignIn,
            null,
            res.data.user_id
          );
        } catch (error) {
          return console.error(error);
        }
      }
    } catch (error) {      
      console.log(error);
    }
  };

  const onCookieClick = (isAccept: boolean) => {
    if (!isAccept) {
      enqueueSnackbar('You should accept our cookies to use the site.', {
        variant: 'error',
      });
    }
    localStorage.setItem('cookieConsent', isAccept ? 'accepted' : 'rejected');
    setCookieConsent('selected');
  };

  // Actually, this function is called by SignInView form.
  const handlePasswordReset = () => {
    // Set the mode to 'passwordReset' to ensure that the correct UI elements are displayed.
    setMode('passwordReset');
    
    // Set the title to 'Reset Password' to notify the user about the purpose of this screen.
    setTitle('Reset Password');
    
    // Show a message to the user explaining what they need to do to reset their password.
    setMessage(resetPasswordMessage);
  };

  // Switch mode, title, and message back to SignIn's
  const handleBackToSignin= () => {
    setMode('signin');
    setTitle('Sign In');
    setMessage(maintenanceMessage);
  };

  return (
    <Page title="Login">
      {cookieConsent === 'rejected' || cookieConsent === '' ? (
        <CookieConsent
          onAccept={() => {
            onCookieClick(true);
          }}
          onDecline={() => {
            onCookieClick(false);
          }}
          visible="show"
          enableDeclineButton
          location="bottom"
          buttonText="Accept All"
          declineButtonText="Reject All"
          cookieName="myAwesomeCookieName2"
          style={{
            background: 'white',
            paddingRight: '0.6rem',
            paddingLeft: '0.5rem',
            display: 'flex',
            alignItems: 'flex-end',
            boxShadow: '0 -1px 10px 0 #acabab4d',
            paddingBottom: '0.2rem',
          }}
          buttonStyle={{
            border: '2px solid black',
            borderColor: customTheme.craa?.palette.dark,
            backgroundColor: customTheme.craa?.palette.dark,
            color: 'white',
            fontWeight: 600,
            padding: '10px 27px',
            fontSize: '15px',
          }}
          declineButtonStyle={{
            border: '2px solid black',
            borderColor: customTheme.craa?.palette.dark,
            backgroundColor: 'white',
            color: customTheme.craa?.palette.dark,
            fontWeight: 600,
            padding: '10px 27px',
            fontSize: '15px',
          }}
          expires={150}
        >
          <Typography
            sx={{
              color: 'black',
              fontWeight: 800,
              mb: 1.5,
              fontSize: '20px',
            }}
          >
            We value your privacy
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'black',
              fontSize: '16px',
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            We use cookies to enhance your browsing experience, serve
            personalized ads or content, and analyze our traffic. By clicking
            "Accept All", you consent to our use of cookies.
          </Typography>
        </CookieConsent>
      ) : (
        <></>
      )}
      <RootStyle>
        <HeaderStyle>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Link href={'/'}>
              {/* <a> */}
                <Image src={logoImg} />
              {/* </a> */}
            </Link>
            <Typography
              variant="h5"
              sx={{
                ml: 1.5,
                color: 'white',
                fontWeight: 700,
                fontSize: '1.5rem',
              }}
            >
              CRA Assessments
            </Typography>
          </div>
          <Box
            sx={{
              mr: 5,
            }}
          >
            <Button
              variant="contained"
              className="trans-btn"
              sx={{
                mr: 1.5,
              }}
              onClick={() => {
                setMode('privacy');
              }}
            >
              Privacy Policy
            </Button>
            <Button
              variant="contained"
              className="trans-btn"
              onClick={() => {
                setMode('signin');
              }}
            >
              Sign-in
            </Button>
          </Box>
        </HeaderStyle>
        <Box
          sx={{
            width: '100vw',
            display: 'flex',
            alignItems: 'flex-start',
            px: 1,
            pt: '60px',
          }}
        >
          {mode === 'signin' || mode === 'passwordReset' ? (
            <>
              <Box
                className="signin-img"
                sx={{
                  width: '50%',
                  height: 'calc(100vh - 75px)',
                  mt: 1,
                }}
              >
                <img
                  height={'100%'}
                  width={'100%'}
                  alt="CRAA"
                  src={cdn_url+'/images/signin.jpg'}
                />
              </Box>
              <Container maxWidth="sm">
                <ContentStyle>
                  {isAuthenticate ? (
                    <TwoFactorAuth user_id={userId} />
                  ) : (
                    <>
                      <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            flexGrow: 1,
                            justifyContent: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <Image src={logoImg} width="48px" height="45px" />
                          <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                              fontWeight: 800,
                              mt: 3.5,
                              mb: 2,
                              fontSize: '28px',
                            }}
                          >
                            {title}
                          </Typography>
                          <Alert
                            severity="info"
                            icon={false}
                            sx={{ width: '100%' }}
                          >
                            {message}
                          </Alert>
                        </Box>
                      </Stack>
                      <Signin signIn={signIn} onPasswordReset={handlePasswordReset} onBackToSignin={handleBackToSignin} mode={mode} />
                    </>
                  )}
                </ContentStyle>
              </Container>
              <FooterStyle>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#396d82',
                    fontWeight: 600,
                  }}
                >
                  © Copyright 2023 CRA Assessments - All Rights Reserved
                </Typography>
              </FooterStyle>
            </>
          ) : (
            <Privacy />
          )}
        </Box>
      </RootStyle>
    </Page>
  );
}
export default observer(SigninPageView);
