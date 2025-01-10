import Box from '@mui/material/Box';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';
import Modal from 'src/ui/components/Modal/Modal';
import InstructionModal from 'src/ui/components/modals/InstructionModal/InstructionModal';
import NoteModal from 'src/ui/components/modals/NoteModal/NoteModal';
import ProtocolModal from 'src/ui/components/modals/ProtocolModal/ProtocolModal';
import StudyDocModal from 'src/ui/components/modals/StudyDocModal/StudyDocModal';
import VideoModal from 'src/ui/components/modals/VideoModal/VideoModal';
import ViewportModal from 'src/ui/components/modals/ViewportModal/ViewportModal';
import ProductTourModal from 'src/ui/components/modals/ProductTourModal/ProductTourModal';
function ModalMountView({}) {
  const { modalStore, userAssessmentCycleStore } = useRootStore();

  const renderModal = (children: React.ReactElement, type: string) => {
    const isVisible = eval(`modalStore.${type}.isVisible`);
    if (!isVisible) return null;

    return (
      <Modal state={modalStore} path={`${type}.isVisible`}>
        {children}
      </Modal>
    );
  };
  return (
    <>
      {renderModal(
        <VideoModal
          assessmentCycleId={
            userAssessmentCycleStore.userAssessmentCycle?.assessmentCycleId
          }
        />,
        'video'
      )}
      {renderModal(<InstructionModal />, 'instruction')}
      {renderModal(<ProtocolModal />, 'protocol')}
      {renderModal(<StudyDocModal />, 'studyDoc')}
      {renderModal(<ProductTourModal />, 'tour')}
      {/* {renderModal(<ViewportModal />, 'viewport')} */}
      {/* {renderModal(<NoteModal />, 'note')} */}
    </>
  );
}
export default observer(ModalMountView);
