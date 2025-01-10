import { observer } from 'mobx-react';
import Note from '../../Notes/Notes';
function NoteModalView(props: any) {
  return <Note />;
}
export default observer(NoteModalView);
