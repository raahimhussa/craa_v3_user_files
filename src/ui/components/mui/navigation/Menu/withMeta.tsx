import { WrappingFunction } from '@shopify/react-compose';
import { observer } from 'mobx-react';
import { MenuProps } from './Menu';
const withMeta: WrappingFunction = (WrappedComponent) =>
  observer(({ ...rest }: MenuProps) => {
    const items = [
      {
        text: '1',
        onClick: () => null,
      },
      {
        text: '2',
        onClick: () => null,
      },
    ];
    return <WrappedComponent items={items} {...rest} />;
  });

export default withMeta;
