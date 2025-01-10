import { Button } from '@components';
import { Box, StepLabel } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import { MobxUtil } from '@utils';
import { action, reaction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react';
import { Key, ReactChild, ReactFragment, ReactPortal } from 'react';
import uniqid from 'uniqid';

function StepperView({
  disabled = false,
  state = {},
  path = '',
  steps = [],
  onPressDone = () => alert('done'),
  ...rest
}: any) {
  const localState = useLocalObservable(() => ({
    value: MobxUtil._get(state, path) || 0,
  }));

  reaction(
    () => localState.value,
    () => MobxUtil._set(state, path, localState.value)
  );

  reaction(
    () => MobxUtil._get(state, path),
    () => (localState.value = MobxUtil._get(state, path))
  );

  const onClickButton = action(() => {
    steps[localState.value]?.button.onClick();
  });
  const media = useMediaQuery((theme: any) => theme.breakpoints.up('sm'));

  return (
    <>
      <Button
        loading={steps[localState.value]?.button.loading}
        disabled={steps[localState.value]?.button.disabled}
        onClick={onClickButton}
        variant="contained"
        sx={{
          borderRadius: '8px',
          color: 'white',
          fontWeight: 600,
          py: 1,
          boxShadow: 'rgb(83 172 169 / 24%) 0px 5px 5px 0px',
          mb: 2,
        }}
      >
        {steps[localState.value]?.button.label}
      </Button>
      <Box
        sx={{
          width: '100%',
          // position: 'absolute',
          // bottom: ['-210px', '-210px', '-55px'],
          // left: '0',
        }}
      >
        <Stepper
          activeStep={localState.value}
          orientation={media ? 'horizontal' : 'vertical'}
          sx={
            media
              ? {
                  display: 'flex',
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                  height: '72px',
                }
              : { alignItems: 'center' }
          }
        >
          {steps?.map(
            (step: {
              label:
                | boolean
                | ReactChild
                | ReactFragment
                | ReactPortal
                | null
                | undefined;
            }) => (
              <Step key={uniqid()}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            )
          )}
        </Stepper>
      </Box>
    </>
  );
}
export default observer(StepperView);
