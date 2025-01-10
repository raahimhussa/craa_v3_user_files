import { observer } from 'mobx-react';
const withRightButtons = (WrappedComponent: any) =>
  observer(({ ...rest }) => {
    const rightButtons: any = [
      // {
      //   title: 'ADD NOTE',
      //   onClick: () => {},
      // },
    ];
    return <WrappedComponent {...rest} rightButtons={rightButtons} />;
  });

export default withRightButtons;
