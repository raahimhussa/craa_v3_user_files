import { observer } from 'mobx-react';
import { Box, Container, Copyright, Grid, Link, Typography } from '@components';

function FooterView({ ...rest }: any) {
  return (
    <Typography
      variant="body2"
      sx={{
        position: 'static',
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#666666',
        bottom: '0',
        color: '#FFFFFF',
      }}
    >
      © Copyright 2022 CRA Assessments - All Rights Reserved
    </Typography>
  );
}
export default observer(FooterView);
