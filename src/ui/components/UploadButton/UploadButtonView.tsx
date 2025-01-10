import styled from '@emotion/styled';
import { PhotoCamera } from '@mui/icons-material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { observer } from 'mobx-react';

const Input = styled('input')({
  display: 'none',
});

function UploadButtonView({ ...rest }: any) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input
          multiple
          id="contained-button-file"
          type="file"
          accept="image/*"
        />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      <label htmlFor="icon-button-file">
        <Input id="icon-button-file" accept="image/*" type="file" />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </Stack>
  );
}
export default observer(UploadButtonView);
