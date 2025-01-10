import { observer } from 'mobx-react';
import { NextPage } from 'next';
import { useRootStore } from 'src/stores';
import Profile from 'src/ui/pages/Profile/Profile';

const ProfilePageView: NextPage = () => {
  const { authStore } = useRootStore();
  return <Profile />;
};

export default observer(ProfilePageView);
