import compose from '@shopify/react-compose';
import MenuView from './MenuView';
import withMeta from './withMeta';

type WrappedComponentProps = {
  items?: Array<any>;
  viewport: any;
};
export type MenuProps = WrappedComponentProps;
export default compose<MenuProps>(withMeta)(MenuView);
