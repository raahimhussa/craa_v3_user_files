import { grey, blue } from '@mui/material/colors';
import { WrappingFunction } from '@shopify/react-compose';
import { observer } from 'mobx-react';

const withStyle: WrappingFunction = (WrappedComponent: any) =>
  observer((props: any) => {
    const { header = true } = props;
    const tableStyle: React.CSSProperties = {
      border: '1px solid #f2f2f2',
    };
    const rowStyle: React.CSSProperties = {
      fontWeight: 700,
      textAlign: 'center',
    };
    const headerStyle: React.CSSProperties = {
      display: header ? undefined : 'none',
      backgroundColor: '#333333',
      color: 'white',
      lineHeight: '46px',
      textAlign: 'center',
    };
    const resizerStyle: React.CSSProperties = {
      position: 'absolute',
      right: 0,
      top: 0,
      background: 'white',
      height: '100%',
      zIndex: 1,
    };
    const bodyStyle: React.CSSProperties = {};
    const cellStyle: React.CSSProperties = {
      backgroundColor: 'white',
      lineHeight: '46px',
      borderWidth: 1,
      borderColor: 'white',
      borderBlockStyle: 'solid',
    };
    const styles = {
      tableStyle,
      rowStyle,
      headerStyle,
      resizerStyle,
      bodyStyle,
      cellStyle,
    };

    return <WrappedComponent {...props} {...styles} />;
  });

export default withStyle;
