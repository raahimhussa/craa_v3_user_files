// import Link from '@mui/material/Link'
import NextLink from 'next/link';

import { observer } from 'mobx-react';
import { Typography } from '@components';
function LinkView({ children, href = '/', ...rest }: any) {
  return (
    <Typography variant="button" color="primary" sx={{ cursor: 'pointer' }}>
      {children}
    </Typography>
  );
}
export default observer(LinkView);
