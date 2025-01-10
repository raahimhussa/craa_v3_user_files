import { Spacer, Container } from '@components';
import { AppBar, Box, Typography, Link } from '@mui/material';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useRootStore } from 'src/stores';
import logoImg from 'public/logo/logo_full.png';
import Image from 'next/image';
import { styled } from '@mui/material/styles';

function BearHeadLayoutView({ children = null }: any) {
  const items = {
    left: [],
    right: [],
    center: [],
  };
  const { uiState } = useRootStore();
  const router = useRouter();

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
  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
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
          height: 'calc(100vh - 70px)',
          display: 'flex',
          backgroundColor: 'white',
          flexDirection: 'column',
          alignItems: 'center',
          WebkitJustifyContent: 'center',          
        }}
      >
          {children}        
      </Container>
    </Box>
  );
}
export default observer(BearHeadLayoutView);
