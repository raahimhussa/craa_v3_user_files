import { Box } from '@components';
import { observer } from 'mobx-react';
import Image from 'next/image';
import React from 'react';
function CopyrightView({ logo = true }: { logo?: boolean }) {
  return (
    <Box
      sx={{
        bgcolor: '#3d4042',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: '0.2rem',
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
      }}
    >
      <Image
        height={12}
        width={12}
        alt="CRAA"
        layout="fixed"
        src="/img/components/copyright/sLogo.png"
      />
      <Box sx={{ fontWeight: 700, color: 'white', ml: 1, fontSize: 10 }}>
        © Copyright 2022 CRA Assessments - All Rights Reserved
      </Box>
    </Box>
  );
}
export default observer(CopyrightView);
