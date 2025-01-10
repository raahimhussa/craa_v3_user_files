import { Spacer, Container } from '@components';
import { AppBar, Box, Typography, Link } from '@mui/material';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useRootStore } from 'src/stores';
import logoImg from 'public/logo/logo_full.png';
import Image from 'next/image';
import { styled } from '@mui/material/styles';

function AuthLayoutView({ children = null }: any) {
  const items = {
    left: [],
    right: [],
    center: [],
  };
  const { uiState } = useRootStore();
  const router = useRouter();
  const marginValue =
    router.pathname === '/auth/passwordGenerator' ? '60px' : '27px';

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
    // backgroundColor : theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      // alignItems: 'flex-start',
      padding: theme.spacing(1.5, 5, 1.5, 5),
    },
  }));
  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* <AppBar
        sx={{
          backgroundImage: (theme) => theme.craa?.palette.mainGradiant,
          height: '58px',
          justifyContent: 'center',
          px: 2
        }}>
        <Typography variant="h6">
          CRA Assessments
        </Typography>
      </AppBar> */}
      <HeaderStyle>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link href={'/home'}>
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
      </HeaderStyle>
      <Spacer spacing={7} />
      <Container
        maxWidth={false}
        sx={{
          overflowY: 'scroll',
          // height: uiState.windowDimensions.height,
          height: 'calc(100vh - 70px)',
          display: 'flex',
          backgroundColor: 'white',
          flexDirection: 'column',
          alignItems: 'center',
          WebkitJustifyContent: 'center',
          // paddingBottom: 56,
        }}
      >
        {/* <Spacer spacing={6} /> */}
        <Box
          sx={{
            width: ['311px', '400px', '800px', '1000px', '1200px'],
            height: 'auto',
            backgroundColor: 'white',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '25px 30px',
            // marginBottom: ['250px', '250px', '78px'],
            // marginTop: marginValue,
            boxShadow:
              'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
            borderRadius: '1rem',
            border: '1px solid #e6e6e6',
          }}
        >
          {children}
        </Box>
        {/* <Spacer spacing={6} /> */}
      </Container>
    </Box>
  );
}
export default observer(AuthLayoutView);
