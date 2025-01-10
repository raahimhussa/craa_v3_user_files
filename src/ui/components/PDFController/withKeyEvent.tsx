import { WrappingFunction } from '@shopify/react-compose';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import Viewport from 'src/models/viewport';
import { useRootStore } from 'src/stores';

type K = KeyboardEvent['key'];
const withKeyEvent: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const {
      viewport,
    }: {
      viewport: Viewport;
    } = props;

    const {
      uiState: { note },
    } = useRootStore();

    useEffect(() => {
      const handleArrowKey = (key: K) => {
        if (key === 'ArrowRight') {
          viewport.nextPage(viewport._id);
        } else if (key === 'ArrowLeft') {
          viewport.prevPage(viewport._id);
        }
      };

      function handleKeyevent(ev: KeyboardEvent) {
        if (viewport.active && !note.isFocused) {
          handleArrowKey(ev.key);
        }
      }

      window?.addEventListener('keydown', handleKeyevent);
      return () => window.removeEventListener('keydown', handleKeyevent);
    }, [viewport, viewport?.active]);

    return <WrappedComponent {...props} />;
  });

export default withKeyEvent;
