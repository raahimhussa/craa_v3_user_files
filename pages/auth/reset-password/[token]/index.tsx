import { observer } from 'mobx-react';
import type { NextPage } from 'next';
import ResetPassword from 'src/ui/pages/ResetPassword/ResetPassword';
const ResetPasswordView: NextPage = () => {
  return <ResetPassword />
};

export default observer(ResetPasswordView);
