import { Checkbox, Spacer, Typography, Button, Dialog } from '@components';
import { Yard } from '@mui/icons-material';
import {
  Box,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { observer } from 'mobx-react';
import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRootStore } from 'src/stores';
import Swal from 'sweetalert2';
import policy from './Policy';

function AgreementsView({ state, agreements }: any) {
  const policyText = agreements[0]?.htmlContent;
  const pollicyRef = useRef(null);
  const [isRead, setIsRead] = useState(false);
  const { routerStore } = useRootStore();

  // const onScroll = () => {
  //   if (pollicyRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = pollicyRef.current;
  //     if (scrollHeight - scrollTop === clientHeight) {
  //       setIsRead(true);
  //     }
  //   }
  // };

  return (
    <>
      <Box
        sx={{
          flex: 1,
          // borderBottom: '1px solid #000000;',
        }}
      >
        <Typography align="left" variant="h5" sx={{ fontWeight: 700 }}>
          {agreements[0]?.label}
        </Typography>
        <Spacer spacing={3} />
        <Box
          sx={{
            height: ['250px', '250px', '250px', '250px', '400px'],
            fontSize: '0.9rem',
            overflowY: 'scroll',
          }}
          // onScroll={() => onScroll()}
          ref={pollicyRef}
        >
          {policyText != undefined ? (
            <div dangerouslySetInnerHTML={{ __html: policyText }}></div>
          ) : (
            <ReactMarkdown>
              {policyText != undefined ? policyText : policy}
            </ReactMarkdown>
          )}
        </Box>
        <Spacer spacing={3} />
      </Box>
      <Divider />
      <Spacer spacing={3} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {!isRead ? (
          <Typography
            sx={{
              position: 'absolute',
              fontSize: 13,
              color: 'red',
              mt: -2,
            }}
          >
            Please read the privacy policy to accept
          </Typography>
        ) : (
          <></>
        )}
        <Checkbox
          width="619px"
          label="I accept the Privacy Policy"
          state={state}
          path="isChecked"
          // disabled={!isRead}
        />
        <Button
          onClick={() => {
            Swal.fire({
              title: 'Are you sure?',
              text: 'You must agree the privacy policy to continue the signup.',
              // icon: 'warning',
              confirmButtonText: 'Change my mind',
              confirmButtonColor: 'green',
              cancelButtonText: 'I do not accept.',
              cancelButtonColor: 'red',
              showCancelButton: true,
              heightAuto: false,
            }).then((result) => {
              if (!result.isConfirmed) {
                routerStore.go('/auth/signin');
              }
            });
          }}
          variant="contained"
          sx={{
            // width: ['279px', '333px'],
            px: 3,
            color: 'white',
            backgroundColor: '#FF4842',
            borderRadius: '8px',
            boxShadow: 'rgb(255 72 66 / 24%) 0px 3px 5px 0px',
            fontWeight: 600,
            fontSize: '0.73rem',
          }}
        >
          I DO NOT ACCEPT THE PRIVACY POLICY
        </Button>
      </Box>
      <Spacer spacing={2} />
    </>
  );
}
export default observer(AgreementsView);
