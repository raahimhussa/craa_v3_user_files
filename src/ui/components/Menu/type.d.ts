export interface MenuItem {
  text?: string;
  title?: string;
  onClick?: () => void;
  isViewed?: boolean;
  children: Array<MenuItem>;
  isViewedAll?: string;
}
