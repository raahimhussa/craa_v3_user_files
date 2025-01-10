import { withState } from '@hocs';
import compose from '@shopify/react-compose';
import PasswordResetFormView from './PasswordResetFormView';

// interface PasswordResetFormProps {
//     disabled: boolean;
// }

// const getState = (props: any) => ({
//     disabled: props.disabled,
//     ...props
// });

// // Compose the component outside of the component function
// const PasswordResetFormComponent = compose<any>(
//     withState(getState),
// )(PasswordResetFormView);

// const PasswordResetForm = ({ disabled }: PasswordResetFormProps) => {
//     console.log(disabled)
//     return <PasswordResetFormComponent disabled={disabled} />;
//   };
  
// export default PasswordResetForm;

const getState = (props: any) => ({
    disabled: props.disabled,
    ...props
});
  export default compose<any>(
    withState(getState),
  )(PasswordResetFormView);

  
