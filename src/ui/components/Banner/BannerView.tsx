import { Image } from '@components';
import Box from '@mui/system/Box';
import { observer } from 'mobx-react';
import Typography from '../Typography/Typography';
function BannerView({
  h2 = 'h2',
  h4 = 'h4',
  src = '/img/components/banner/bg.png',
}) {
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          zIndex: 1,
          left: 50,
          top: 400,
        }}
      >
        <Typography sx={{ color: 'white' }} variant="h2">
          {h2}
        </Typography>
        <Box sx={{ height: 27 }}></Box>
        <Typography sx={{ color: 'white' }} variant="h4">
          {h4}
        </Typography>
      </Box>
      <Image
        style={{
          width: '100%',
          height: '100%',
        }}
        src={src}
      />
    </>
  );
}
export default observer(BannerView);
