import { VideoLibrary } from '@mui/icons-material';
import { Divider, IconButton, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
import uniqid from 'uniqid';
import customTheme from 'src/ui/theme/customizedTheme';

export interface ACHeader {
  text: string;
  tutorialUrl: string | undefined;
}

function ACHeadersView({ headers = [] }: any) {
  const renderHeader = (header: ACHeader) => (
    <Header key={uniqid()} tutorialUrl={header.tutorialUrl}>
      {header.text}
    </Header>
  );
  return <Box sx={{ display: 'flex' }}>{headers?.map(renderHeader)}</Box>;
}

export default observer(ACHeadersView);

export const Header = observer(
  ({
    children,
    tutorialUrl,
  }: {
    children: React.ReactNode;
    tutorialUrl: string | undefined;
  }) => {
    const { modalStore } = useRootStore();
    const onClickVideo = () => {
      modalStore.video.isVisible = true;
      modalStore.video.payload.url = tutorialUrl;
    };

    return (
      <Box
        sx={{
          fontWeight: 700,
          height: 50,
          flex: 1,
          fontSize: '1.2rem',
          color: customTheme.craa?.palette.darkfont,
          alignItems: 'center',
          justifyContent: 'flex-start',
          display: 'flex',
          bgcolor: 'rgb(250,250,250)',
          borderBottom: '1px solid black',
          borderColor: customTheme.craa?.palette.lightborder,
          // boxShadow:
          //   'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
          px: 2.5,
        }}
      >
        {children}
        {/* <IconButton
          onClick={onClickVideo}
          sx={{
            backgroundColor: '#ffe6e6',
            color: 'rgb(183, 33, 54)',
            borderRadius: '8px',
            fontSize: '0.8rem',
            ml: 1,
            display: 'flex',
            alignItems: 'center',
            height: '60%',
            '&:hover': {
              bgcolor: 'white',
            },
          }}
        >
          <VideoLibrary sx={{ fontSize: '0.93rem', mr: '0.2rem' }} />
          <Typography
            variant="button"
            sx={{ fontWeight: 600, fontSize: '0.7rem' }}
          >
            Tutorial
          </Typography>
        </IconButton> */}
      </Box>
    );
  }
);
