import { observer } from 'mobx-react';
import Protocol from '../../Protocol/Protocol';

function ProtocolModalView({ protocolId = '' }: { protocolId: string }) {
  return <Protocol protocolId={protocolId} />;
}

export default observer(ProtocolModalView);
