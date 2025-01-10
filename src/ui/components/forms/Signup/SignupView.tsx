import { Stepper } from '@components';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react';
import { AuthLayout } from '@layouts';
function SignupView({ state, steps }: any) {
  return (
    <AuthLayout>
      <Box
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',

          // height: 800,
        }}
      >
        {steps[state.step].render()}
      </Box>
      <Stepper
        disabled={!state.isChecked}
        state={state}
        path="step"
        steps={steps}
      />
    </AuthLayout>
  );
}
export default observer(SignupView);
