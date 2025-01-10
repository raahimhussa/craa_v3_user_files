import { observer } from 'mobx-react';
function VideoView(props: any) {
  return <video {...props} />;
}
export default observer(VideoView);
