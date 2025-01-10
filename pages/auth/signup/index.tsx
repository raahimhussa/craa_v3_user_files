import { observer } from 'mobx-react';
import { NextPage } from 'next';
import Signup from 'src/ui/pages/Signup/Signup';

const SignupPageView: NextPage = () => {
  return <Signup />
};

export default observer(SignupPageView);
