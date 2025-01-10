import { observer } from 'mobx-react';
import { SpacerProps } from './Spacer';
function SpacerView({ row = false, spacing = 2, style, ...rest }: SpacerProps) {
  let _style: any = {
    height: spacing * 8,
  };

  if (row) {
    _style = {
      width: spacing * 8,
    };
  }

  return <div {...rest} style={_style} />;
}
export default observer(SpacerView);
