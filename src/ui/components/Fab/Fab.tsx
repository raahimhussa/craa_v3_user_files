import * as React from 'react';
import Fab from '@mui/material/Fab';
import { observer } from 'mobx-react';
import { Edit } from '@mui/icons-material';
function FabView(props: any) {
  const { onClickAddNote } = props;
  return (
    <Fab
      sx={{
        width: 156,
        height: 50,
        right: 13,
        position: 'absolute',
        bottom: 50,
      }}
      color="secondary"
      onClick={onClickAddNote}
    >
      ADD NOTE
      <Edit
        sx={{
          ml: 1,
        }}
        fontSize="small"
      />
    </Fab>
  );
}

export default observer(FabView);
