import compose from '@shopify/react-compose';
import SignupView from './SignupView';
import { withState } from '@hocs';
import withMeta from './withMeta';

const getState = () => ({
  step: 0,
  isChecked: false,
  isLoading: false,
});

export default compose<any>(
  withState(getState),
  withMeta
)(SignupView);
