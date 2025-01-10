import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { observer, useLocalObservable } from 'mobx-react';
import { UIEventHandler, useEffect, useRef } from 'react';
import { useRootStore } from 'src/stores';
import customTheme from 'src/ui/theme/customizedTheme';

function ReactScrollView({
  title = 'Title',
  content = null,
  htmlContent = '',
  onClick = () => null,
  type = '',
}: {
  url?: string;
  children?: React.ReactNode;
  content?: React.ReactNode;
  htmlContent?: string;
  title?: string;
  onClick?: () => void;
  type?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { uiState } = useRootStore();
  const localState = useLocalObservable(() => ({
    button: {
      disabled: true,
    },
    isShortContent: false,
    height: 200,
  }));
  console.log(onClick);

  useEffect(() => {
    const isShortContent =
      ref.current?.offsetHeight === ref.current?.scrollHeight;
    if (isShortContent) {
      localState.button.disabled = false;
    }
  }, []);

  const onScroll: UIEventHandler<HTMLDivElement> | undefined = (e) => {
    if (ref.current) {
      // console.log('offsetHeight', ref.current?.offsetHeight)
      // console.log('scrollHeight', ref.current?.scrollHeight)
      // console.log('scrollTop', ref.current?.scrollTop)
      if (
        ref.current?.offsetHeight + Math.round(ref.current?.scrollTop) >=
        ref.current?.scrollHeight
      ) {
        localState.button.disabled = false;
      }
    }
  };
  // console.log(localState.button.disabled)

  return (
    <Box sx={{ background: 'transparent' }}>
      <Box
        sx={{
          height: 45,
          bgcolor: customTheme.craa?.palette.dark,
          borderTopLeftRadius: '7px',
          borderTopRightRadius: '7px',
        }}
      >
        <Box
          sx={{
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: 18,
            position: 'relative',
          }}
        >
          {title}
          <Button
            sx={{
              borderRadius: 0,
              bgcolor: 'transparent',
              fontWeight: 800,
              position: 'absolute',
              right: 0,
              border: 'none',
              boxShadow: 'none',
              fontSize: '0.9rem',
              mr: 1,
              '&:hover': {
                bgcolor: 'transparent',
                border: 'none',
                boxShadow: 'none',
              },
            }}
            variant="contained"
            onClick={onClick}
            // disabled={localState.button.disabled}
          >
            Close
          </Button>
        </Box>
      </Box>
      <Box>
        <div
          style={{
            width: '100%',
            overflowX: 'auto',
            maxHeight: uiState.windowDimensions.height * (2 / 3),
            minHeight: uiState.windowDimensions.height * (2 / 3),
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'cneter',
            border: 100,
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            paddingLeft: type === 'instruction' ? '1rem' : '0',
          }}
          ref={ref}
          onScroll={onScroll}
          dangerouslySetInnerHTML={
            htmlContent ? { __html: htmlContent } : undefined
          }
        >
          {content}
        </div>
      </Box>
    </Box>
  );
}
export default observer(ReactScrollView);
