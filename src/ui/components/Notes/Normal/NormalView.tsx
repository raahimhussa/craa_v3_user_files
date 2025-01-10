import { TextField } from '@components';
import {
  Alert,
  Button,
  Card,
  CardHeader,
  Chip,
  InputLabel,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useRootStore } from 'src/stores';
import customTheme from 'src/ui/theme/customizedTheme';
import DataGrid from '../../DataGrid/DataGrid';
function NormalView(props: any) {
  const {
    noteStore,
    viewportStore,
    uiState: { note },
  } = useRootStore();

  return (
    // <Box
    //   sx={{
    //     bgcolor: grey[100],
    //     p: 2,
    //     // height: props.height,
    //     // height: 'calc(100% - 100px)',
    //     height: props.height,
    //     paddingBottom: 40,
    //   }}
    // >
    <Box
      sx={{
        // resize: 'both',
        overflowY: 'scroll',
        overflowX: 'hidden',
        // height:
        //   activeViewport?.simDoc?.kind! === 'StudyMedication' ? 330 : 400,
        height: props.height,
        minWidth: 400,
        maxHeight: 700,
        paddingBottom: 40,
      }}
      className="note-table"
    >
      <DataGrid {...props} data={noteStore?.notes} />
    </Box>
    // </Box>
    // <Box
    //   sx={{
    //     bgcolor: grey[100],
    //     p: 2,
    //     border: '1px solid black',
    //     borderColor: 'rgb(25, 52, 51,0.3)',
    //     borderTop: 'none',
    //     height: props.height,
    //   }}
    // >
    //   <Box
    //     sx={{
    //       // resize: 'both',
    //       overflowY: 'scroll',
    //       overflowX: 'hidden',
    //       height:
    //         activeViewport?.simDoc?.kind! === 'StudyMedication' ? 330 : 400,
    //     }}
    //     className="note-table"
    //   >
    //     <DataGrid {...props} data={_.cloneDeep(noteStore.notes)} />
    //   </Box>
    //   <Paper sx={{ p: 1 }}>
    //     <Box
    //       sx={{
    //         display: 'flex',
    //         alignItems: 'flex-end',
    //         justifyContent: 'space-between',
    //         mb: 1,
    //       }}
    //     >
    //       {disabled ? (
    //         <Alert sx={{ width: '100%' }} severity="warning">
    //           Select viewport to add a note.
    //         </Alert>
    //       ) : (
    //         <Stack direction={'row'} spacing={1}>
    //           <Chip
    //             sx={{
    //               fontWeight: 700,
    //               color: customTheme.craa?.palette.blue,
    //             }}
    //             label={activeViewport?.simDoc?.title}
    //           />
    //           <Chip
    //             sx={{
    //               fontWeight: 700,
    //               color: customTheme.craa?.palette.blue,
    //             }}
    //             label={`Page : ${activeViewport?.simDoc?.currentPage! + 1} `}
    //           />
    //           <Chip
    //             sx={{
    //               fontWeight: 700,
    //               color: customTheme.craa?.palette.orange,
    //             }}
    //             label={`Viewport : ${activeViewport?.index! + 1}`}
    //           />
    //         </Stack>
    //       )}
    //       {activeViewport?.simDoc?.kind! === 'Document' ? (
    //         <Typography
    //           sx={{
    //             fontWeight: 600,
    //             color: customTheme.craa?.palette.mainfont,
    //           }}
    //         >
    //           <span
    //             style={{
    //               color:
    //                 inputLength < 300
    //                   ? customTheme.craa?.palette.green
    //                   : customTheme.craa?.palette.red,
    //               marginRight: '0.1rem',
    //             }}
    //           >
    //             {inputLength}
    //           </span>
    //           <span
    //             style={{
    //               marginRight: '0.1rem',
    //             }}
    //           >
    //             /
    //           </span>
    //           300
    //         </Typography>
    //       ) : (
    //         <></>
    //       )}
    //     </Box>
    //     {activeViewport?.simDoc?.kind! === 'StudyMedication' ? (
    //       <Box
    //         sx={{
    //           // height: '160px',
    //           border: '1px solid black',
    //           position: 'relative',
    //           width: '100%',
    //           p: 1,
    //           display: 'flex',
    //           flexDirection: 'column',
    //           alignItems: 'center',
    //           borderColor: (theme) => theme.craa?.palette.lightborder,
    //         }}
    //       >
    //         <Box
    //           sx={{
    //             display: 'flex',
    //             width: '50%',
    //             justifyContent: 'space-between',
    //             alignItems: 'center',
    //             mb: 0.5,
    //           }}
    //         >
    //           <InputLabel
    //             sx={{
    //               fontWeight: 500,
    //             }}
    //           >
    //             Number of capsules taken by subject
    //           </InputLabel>
    //           <TextField
    //             variant="outlined"
    //             state={noteStore.form}
    //             path="complianceNote.taken"
    //             className="medication-input"
    //           />
    //         </Box>
    //         <Box
    //           sx={{
    //             display: 'flex',
    //             width: '50%',
    //             justifyContent: 'space-between',
    //             alignItems: 'center',
    //             mb: 0.5,
    //           }}
    //         >
    //           <InputLabel
    //             sx={{
    //               fontWeight: 500,
    //               lineHeight: 1.2,
    //             }}
    //           >
    //             Number of capsules that should have been
    //             <br /> taken by subject
    //           </InputLabel>
    //           <TextField
    //             variant="outlined"
    //             state={noteStore.form}
    //             path="complianceNote.shouldTaken"
    //             className="medication-input"
    //           />
    //         </Box>
    //         <Box
    //           sx={{
    //             display: 'flex',
    //             width: '50%',
    //             justifyContent: 'space-between',
    //             alignItems: 'center',
    //             mb: 1,
    //           }}
    //         >
    //           <InputLabel
    //             sx={{
    //               fontWeight: 500,
    //             }}
    //           >
    //             Percent(%) Compliance
    //           </InputLabel>
    //           <TextField
    //             variant="outlined"
    //             state={noteStore.form}
    //             path="complianceNote.percent"
    //             className="medication-input"
    //             InputProps={{
    //               endAdornment: (
    //                 <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>
    //                   %
    //                 </Typography>
    //               ),
    //             }}
    //           />
    //         </Box>
    //         <Button
    //           disabled={disabled}
    //           onClick={onClickSave}
    //           sx={{
    //             // position: 'absolute',
    //             width: '50%',
    //             // height: 32,
    //             // right: 5,
    //             // bottom: 5,
    //             bgcolor: (theme) => theme.craa?.palette.dark,
    //             // bgcolor: 'white',

    //             '&:hover': {
    //               bgcolor: (theme) => theme.palette.secondary.dark,
    //             },
    //           }}
    //         >
    //           <Box
    //             sx={{
    //               // color: (theme) => theme.craa?.palette.orange,
    //               color: 'white',
    //               fontWeight: 700,
    //               fontSize: '13px',
    //             }}
    //           >
    //             SAVE
    //           </Box>
    //         </Button>
    //       </Box>
    //     ) : activeViewport?.simDoc?.kind! === 'RescueMedication' ? (
    //       <Box
    //         sx={{
    //           // height: '160px',
    //           border: '1px solid black',
    //           position: 'relative',
    //           width: '100%',
    //           p: 1,
    //           display: 'flex',
    //           flexDirection: 'column',
    //           alignItems: 'center',
    //           borderColor: (theme) => theme.craa?.palette.lightborder,
    //         }}
    //       >
    //         <Box
    //           sx={{
    //             display: 'flex',
    //             width: '50%',
    //             justifyContent: 'space-between',
    //             alignItems: 'center',
    //             mb: 1,
    //           }}
    //         >
    //           <InputLabel
    //             sx={{
    //               fontWeight: 500,
    //             }}
    //           >
    //             Number of capsules taken by subject
    //           </InputLabel>
    //           <TextField
    //             variant="outlined"
    //             state={noteStore.form}
    //             path="complianceNote.taken"
    //             className="medication-input"
    //           />
    //         </Box>
    //         <Button
    //           disabled={disabled}
    //           onClick={onClickSave}
    //           sx={{
    //             // position: 'absolute',
    //             width: '50%',
    //             // height: 32,
    //             // right: 5,
    //             // bottom: 5,
    //             bgcolor: (theme) => theme.craa?.palette.dark,
    //             // bgcolor: 'white',

    //             '&:hover': {
    //               bgcolor: (theme) => theme.palette.secondary.dark,
    //             },
    //           }}
    //         >
    //           <Box
    //             sx={{
    //               // color: (theme) => theme.craa?.palette.orange,
    //               color: 'white',
    //               fontWeight: 700,
    //               fontSize: '13px',
    //             }}
    //           >
    //             SAVE
    //           </Box>
    //         </Button>
    //       </Box>
    //     ) : (
    //       <TextField
    //         className="note-text"
    //         inputProps={{ maxLength: 300 }}
    //         onChange={(e: any) => {
    //           countInput(e);
    //         }}
    //         disabled={disabled}
    //         fullWidth
    //         onFocus={() => (note.isFocused = true)}
    //         onBlur={() => (note.isFocused = false)}
    //         minRows={2}
    //         InputProps={{
    //           endAdornment: (
    //             <Button
    //               disabled={disabled}
    //               onClick={onClickSave}
    //               sx={{
    //                 position: 'absolute',
    //                 width: 50,
    //                 height: 32,
    //                 right: 12,
    //                 bottom: 12,
    //                 bgcolor: (theme) => theme.palette.secondary.main,
    //                 '&:hover': {
    //                   bgcolor: (theme) => theme.palette.secondary.dark,
    //                 },
    //               }}
    //             >
    //               <Box
    //                 sx={{
    //                   color: 'white',
    //                   fontWeight: 700,
    //                   fontSize: '13px',
    //                 }}
    //               >
    //                 SAVE
    //               </Box>
    //             </Button>
    //           ),
    //         }}
    //         variant="outlined"
    //         multiline
    //         maxRows={8}
    //         state={noteStore.form}
    //         path="text"
    //       />
    //     )}
    //   </Paper>
    // </Box>
  );
}

export default observer(NormalView);
