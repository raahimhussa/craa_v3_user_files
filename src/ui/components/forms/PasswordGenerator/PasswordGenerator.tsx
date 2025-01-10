import { withState } from '@hocs';
import compose from '@shopify/react-compose';
import PasswordGeneratorView from './PasswordGeneratorView';

const getState = (props: any) => ({
  user: props.signupUser,
});
export default compose<any>(
  withState(getState),
)(PasswordGeneratorView);
