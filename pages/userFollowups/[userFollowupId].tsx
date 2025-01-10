import { observer } from 'mobx-react';
import { NextPage } from 'next';
import UserFollowup from 'src/ui/pages/UserFollowup/UserFollowup';

const UserFollowupPageView: NextPage = () => {
  return <UserFollowup />;
}

export default observer(UserFollowupPageView);
