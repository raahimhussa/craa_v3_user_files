import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { observer } from 'mobx-react';
import { AssessmentCycle } from 'src/models/assessmentCycle';
import ReactPlayer from 'react-player';
import { useEffect, useRef, useState } from 'react';
import { useRootStore } from 'src/stores';
import customTheme from 'src/ui/theme/customizedTheme';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import loadingImg from 'public/img/components/loading-gif.gif';
import Image from 'next/image';

function VideoModalView(props: any) {
  const {
    assessmentCycle,
    tutorials,
  }: {
    assessmentCycle: AssessmentCycle;
    tutorials: any;
  } = props;
  const { modalStore, userAssessmentCycleStore } = useRootStore();
  const type = modalStore.tutorialType;
  const index = modalStore.uacIndex;
  const reactPlayerRef = useRef<ReactPlayer>(null);
  const viewPercent = 0.3;
  const [isPlaying, setIsplaying] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  console.log('video>>>>>', tutorials);

  useEffect(() => {
    const duration = reactPlayerRef?.current?.getDuration();
    if (
      duration !== null &&
      duration !== undefined &&
      duration !== 0 &&
      userAssessmentCycleStore.userAssessmentCycles[index].simTutorialDuration >
        duration! * viewPercent
    ) {
      userAssessmentCycleStore.userAssessmentCycleRepository.update({
        filter: {
          _id: userAssessmentCycleStore.userAssessmentCycles[index]._id,
        },
        update: {
          isSimTutorialViewed: true,
        },
      });
    }
  }, [
    userAssessmentCycleStore.userAssessmentCycles[index].simTutorialDuration,
  ]);

  useEffect(() => {
    const duration = reactPlayerRef?.current?.getDuration();
    if (
      duration !== null &&
      duration !== undefined &&
      duration !== 0 &&
      userAssessmentCycleStore.userAssessmentCycles[index]
        .trainingTutorialDuration >
        duration! * viewPercent
    ) {
      userAssessmentCycleStore.userAssessmentCycleRepository.update({
        filter: {
          _id: userAssessmentCycleStore.userAssessmentCycles[index]._id,
        },
        update: {
          isTrainingTutorialViewed: true,
        },
      });
    }
  }, [
    userAssessmentCycleStore.userAssessmentCycles[index]
      .trainingTutorialDuration,
  ]);

  const onSeek = (seconds: number) => {
    const videotime =
      type === 'baseline'
        ? userAssessmentCycleStore.userAssessmentCycles[index]
            .simTutorialDuration
        : userAssessmentCycleStore.userAssessmentCycles[index]
            .trainingTutorialDuration;
    if (videotime == undefined) return;
    if (seconds < videotime) {
      reactPlayerRef.current?.seekTo(seconds!, 'seconds');
      setIsplaying(false);
    } else {
      reactPlayerRef.current?.seekTo(videotime!, 'seconds');
      setIsplaying(false);
    }
    setIsplaying(true);
    // if (seconds > videotime) {
    //   reactPlayerRef.current?.seekTo(videotime!, 'seconds');
    // } else {
    //   reactPlayerRef.current?.seekTo(seconds!, 'seconds');
    // }
  };

  const onPlay = () => {
    setIsplaying(true);
  };
  const onPause = () => {
    setIsplaying(false);
  };

  const onReady = () => {
    if (type === 'baseline') {
      reactPlayerRef.current?.seekTo(
        userAssessmentCycleStore.userAssessmentCycles[index]
          .simTutorialDuration!,
        'seconds'
      );
    } else {
      reactPlayerRef.current?.seekTo(
        userAssessmentCycleStore.userAssessmentCycles[index]
          .trainingTutorialDuration!,
        'seconds'
      );
    }
  };

  const onProgress = async (e: any) => {
    const param =
      type === 'baseline'
        ? { simTutorialDuration: Math.floor(e.playedSeconds) }
        : { trainingTutorialDuration: Math.floor(e.playedSeconds) };
    if (type === 'baseline') {
      if (
        userAssessmentCycleStore.userAssessmentCycles[index]
          .simTutorialDuration < Math.floor(e.playedSeconds)
      ) {
        userAssessmentCycleStore.userAssessmentCycleRepository.update({
          filter: {
            _id: userAssessmentCycleStore.userAssessmentCycles[index]._id,
          },
          update: {
            ...param,
          },
        });
        userAssessmentCycleStore.userAssessmentCycles[
          index
        ].simTutorialDuration = Math.floor(e.playedSeconds);
      }
    } else {
      if (
        userAssessmentCycleStore.userAssessmentCycles[index]
          .simTutorialDuration < Math.floor(e.playedSeconds)
      ) {
        userAssessmentCycleStore.userAssessmentCycleRepository.update({
          filter: {
            _id: userAssessmentCycleStore.userAssessmentCycles[index]._id,
          },
          update: {
            ...param,
          },
        });
      }

      userAssessmentCycleStore.userAssessmentCycles[
        index
      ].trainingTutorialDuration = Math.floor(e.playedSeconds);
    }
  };

  const options = {
    url:
      type === 'baseline'
        ? tutorials.find((el: any) => el.type === 'simulation').url
        : tutorials.find((el: any) => el.type === 'training').url,
    // url:
    //   type === 'baseline'
    //     ? userAssessmentCycleStore.userAssessmentCycles[
    //         index
    //         //@ts-ignore
    //       ].assessmentCycle.tutorials.baselineUrl.substring(0, 8) !== 'https://'
    //       ? //@ts-ignore
    //         `https://${userAssessmentCycleStore.userAssessmentCycles[index].assessmentCycle.tutorials.baselineUrl}`
    //       : //@ts-ignore
    //         userAssessmentCycleStore.userAssessmentCycles[index].assessmentCycle
    //           .tutorials.baselineUrl
    //     : //@ts-ignore
    //     userAssessmentCycleStore.userAssessmentCycles[
    //         index
    //         //@ts-ignore
    //       ].assessmentCycle.tutorials.trainingUrl.substring(0, 8) !== 'https://'
    //     ? //@ts-ignore
    //       `https://${userAssessmentCycleStore.userAssessmentCycles[index].assessmentCycle.tutorials.trainingUrl}`
    //     : //@ts-ignore
    //       userAssessmentCycleStore.userAssessmentCycles[index].assessmentCycle
    //         .tutorials.trainingUrl,
    width: 1200,
    loop: true,
  };

  console.log(options.url);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        pt: '3%',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          backgroundColor: customTheme.craa?.palette.dark,
          width: '1200px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '0.5rem',
          height: '40px',
        }}
      >
        <Typography sx={{ color: 'white', fontWeight: 700 }}>
          Tutorial
        </Typography>
        <Button
          onClick={() => {
            const duration = reactPlayerRef?.current?.getDuration();
            if (type === 'baseline') {
              if (
                duration !== null &&
                duration !== undefined &&
                duration !== 0 &&
                userAssessmentCycleStore.userAssessmentCycles[index]
                  .simTutorialDuration >
                  duration! * viewPercent
              ) {
                modalStore.video.isVisible = false;
                userAssessmentCycleStore.mutate();
              } else {
                setOpen(true);
              }
            } else {
              if (
                duration !== null &&
                duration !== undefined &&
                duration !== 0 &&
                userAssessmentCycleStore.userAssessmentCycles[index]
                  .trainingTutorialDuration >
                  duration! * viewPercent
              ) {
                modalStore.video.isVisible = false;
                userAssessmentCycleStore.mutate();
              } else {
                setOpen(true);
              }
            }
          }}
          sx={{ color: 'white', fontWeight: 700 }}
        >
          Close
        </Button>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
            setIsplaying(true);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You must watch 30% of the video to take the simulation. <br />
              Please make sure you've watched enough.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                setIsplaying(true);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                modalStore.video.isVisible = false;
                userAssessmentCycleStore.mutate();
              }}
              autoFocus
              sx={{
                color: 'red',
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {options.url !== '' ? (
        <Box
          sx={{
            height: '670px',
            width: '1200px',
            bgcolor: 'black',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image src={loadingImg} width="80px" height="80px" />
          <ReactPlayer
            ref={reactPlayerRef}
            url={`https://${options.url}`}
            controls
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0 }}
            onSeek={onSeek}
            onProgress={onProgress}
            playing={isPlaying}
            onReady={onReady}
            onPlay={onPlay}
            onPause={onPause}
          />
        </Box>
      ) : (
        <Box
          sx={{
            height: '600px',
            width: '1200px',
            bgcolor: '#e6e6e6',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <HourglassDisabledIcon
            sx={{
              color: '#b3b3b3',
              fontSize: 50,
              mb: 1,
            }}
          />
          <Typography
            sx={{
              color: '#b3b3b3',
              fontSize: 30,
            }}
          >
            No Tutorial Availatble
          </Typography>
        </Box>
      )}
    </Box>
  );
}
export default observer(VideoModalView);
