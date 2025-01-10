import styled from '@emotion/styled';
import getVideoId from 'get-video-id';
import { observer } from 'mobx-react';
import YouTube from 'react-youtube';
import { AssessmentCycle } from 'src/models/assessmentCycle';
import Vimeo from '@u-wave/react-vimeo';

function TutorialView(props: any) {
  const {
    assessmentCycle,
  }: {
    assessmentCycle: AssessmentCycle;
  } = props;
  const parsedDate = getVideoId(assessmentCycle.tutorials.baselineUrl!);
  const id = parsedDate.id || '';

  const Styles = styled.div`
    react-youtube {
      border: 1px solid red;
    }
  `;

  return (
    <Styles>
      {/* <YouTube
        iframeClassName='react-youtube'
        videoId={id}
        style={{
          width: 640,
          height: 360
        }}
      /> */}
      <Vimeo video="744822322" autoplay />
    </Styles>
  );
}
export default observer(TutorialView);
