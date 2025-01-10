import { observer } from 'mobx-react';
import Instruction from '../../Instruction/Instruction';
function InstructionModalView({
  instructionId = '',
}: {
  instructionId: string;
}) {
  return <Instruction instructionId={instructionId} />;
}
export default observer(InstructionModalView);
