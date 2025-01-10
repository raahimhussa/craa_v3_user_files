import { WrappingFunction } from '@shopify/react-compose';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { useEffect, useRef } from 'react';
import { useRootStore } from 'src/stores';
import { action } from 'mobx';

const withVideo: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const { screenRecorderStore } = useRootStore();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      const setVideo = action(() => {
        screenRecorderStore.video = videoRef.current;
      });
      setVideo();
    }, [screenRecorderStore]);

    return (
      <>
        <video style={{ display: 'none' }} ref={videoRef} />
        <WrappedComponent {...props} videoRef={videoRef} />
      </>
    );
  });

export default withVideo;
