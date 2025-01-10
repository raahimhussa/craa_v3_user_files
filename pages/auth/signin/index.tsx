import type { NextPage } from 'next';
import Signin from 'src/ui/pages/Signin/Signin';
import { observer } from 'mobx-react';
const SigninPageView: NextPage = () => {
  return <Signin />;
};
export default observer(SigninPageView);
