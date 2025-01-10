import { observer } from 'mobx-react';
import { NextPage } from 'next';
import Home from 'src/ui/pages/Home/Home';

const HomePageView: NextPage = () => {
  return <Home />;
};

export default observer(HomePageView);
