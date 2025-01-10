import compose from '@shopify/react-compose';
import type { NextPage } from 'next';
import { withAuth } from '@hocs';

const IndexView: NextPage = () => {
  return <div></div>;
};

export default compose<any>(withAuth)(IndexView);
