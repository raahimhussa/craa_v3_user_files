import { useUser } from '@hooks';
import CircularProgress from '@mui/material/CircularProgress';
import { WrappingFunction } from '@shopify/react-compose';
import _ from 'lodash';
import { observer } from 'mobx-react';
import User from 'src/models/user';
const withUser: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const { user = null }: { user: User | null } = props;

    if (!user) {
      throw new Error('withAuth is need to positioning after withAuth');
    }

    const { data, error } = useUser(`v1/users/${user._id}`);
    // console.log('data', data);

    if (error) return <CircularProgress color="error" />;
    if (_.isEmpty(data)) return <CircularProgress />;
    /**
     * @description override full user
     */
    return <WrappedComponent {...props} user={data} />;
  });

export default withUser;
