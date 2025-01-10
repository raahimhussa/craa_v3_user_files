import { ButtonProps } from '@mui/material/Button';
import compose from '@shopify/react-compose';
import UploadButtonView from './UploadButtonView';

export type ButtonType = ButtonProps & {};

export default compose<ButtonType>()(UploadButtonView);
