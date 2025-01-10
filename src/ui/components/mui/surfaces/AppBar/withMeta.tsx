import { observer } from 'mobx-react';
import uniqid from 'uniqid';

const withMeta = (WrappedComponent: any) =>
  observer(({ ...rest }) => {
    const renderItem = (item: any) => {
      return <div key={uniqid()}>{item.text}</div>;
    };
    const left: any = [
      {
        text: '1',
        onClick: () => alert(''),
      },
      {
        text: '2',
        onClick: () => alert(''),
      },
      {
        text: '3',
        onClick: () => alert(''),
      },
    ];

    const center: any = [
      {
        text: '4',
        onClick: () => alert(''),
      },
      {
        text: '5',
        onClick: () => alert(''),
      },
      {
        text: '6',
        onClick: () => alert(''),
      },
    ];

    const right: any = [
      {
        text: '7',
        onClick: () => alert(''),
      },
      {
        text: '8',
        onClick: () => alert(''),
      },
      {
        text: '9',
        onClick: () => alert(''),
      },
    ];

    const items: any = {
      left,
      right,
      center,
    };

    items['left'].map((item: any) => (item.renderItem = renderItem));
    items['right'].map((item: any) => (item.renderItem = renderItem));
    items['center'].map((item: any) => (item.renderItem = renderItem));

    return <WrappedComponent items={items} {...rest} />;
  });

export default withMeta;
