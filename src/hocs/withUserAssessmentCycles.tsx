import { WrappingFunction } from '@shopify/react-compose';
import { observer, useLocalObservable } from 'mobx-react';
import CircularProgress from '@mui/material/CircularProgress';
import _ from 'lodash';
import { useEffect } from 'react';
import axios from 'axios';
import { toJS } from 'mobx';

const withUAC: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const { user } = props;
    const businessUnit = user.profile.businessUnit;
    const localState: any = useLocalObservable(() => ({
      isLoading: true,
      userAssessmentCycles: [],
    }));
    function buildProtocol(protocolId: string) {
      const result = {
        protocolId,
        read: false,
      };
      return result;
    }

    function buildInstruction(instructionId: string) {
      const result = {
        instructionId,
        read: false,
      };
      return result;
    }

    function buildStudyLogs(studyLogId: string) {
      const result = {
        studyLogId,
        read: false,
      };
      return result;
    }

    useEffect(() => {
      async function getUAC(assessmentCycleId: string) {
        let result = null;

        const filter = { assessmentCycleId, userId: user._id };

        const params = { filter, option: { multi: false } };

        const body = { ...filter };

        const url = 'v1/userAssessmentCycles';

        const { data: userAssessmentCycle } = await axios.get(url, {
          params,
        });

        result = userAssessmentCycle;

        if (result) return result;

        const { data: newUserAssessmentCycle } = await axios.post(url, body);

        result = newUserAssessmentCycle;

        return result;
      }

      async function checkAC() {
        localState.userAssessmentCycles = await Promise.all(
          businessUnit.assessmentCycleIds.map(getUAC)
        );
      }

      user && checkAC();
    }, []);

    useEffect(() => {
      async function buildUAC() {
        await Promise.all(
          localState.userAssessmentCycles.map(
            async (userAssessmentCycle: any) => {
              const acId = userAssessmentCycle.assessmentCycleId;

              const params = {
                filter: { _id: acId },
                options: { multi: false },
              };

              const { data: ac } = await axios.get('v1/assessmentCycles', {
                params,
              });

              // ac.baselines.map((baseline: any) => {
              //   baseline.protocols = baseline.protocolIds.map(buildProtocol)
              //   baseline.instructions = baseline.instructionIds.map(buildInstruction)
              //   baseline.studyLogs = baseline.studyDocumentIds.map(buildStudyLogs)
              // })

              // ac.followups.map((followup: any) => {
              //   followup.protocols = followup.protocolIds.map(buildProtocol)
              //   followup.instructions = followup.instructionIds?.map(buildInstruction)
              //   followup.studyLogs = followup.studyDocumentIds?.map(buildStudyLogs)
              // })

              // ac.trainings.map((training: any) => {
              //   training.protocols = training.protocolIds.map(buildProtocol)
              //   training.instructions = training.instructionIds.map(buildInstruction)
              // })

              userAssessmentCycle.assessmentCycle = ac;

              userAssessmentCycle.user = user;

              return userAssessmentCycle;
            }
          )
        );

        localState.isLoading = false;
      }

      if (localState.userAssessmentCycles?.length > 0) {
        buildUAC();
      }
    }, [localState, localState.userAssessmentCycles?.length, user]);

    if (localState.isLoading || localState.userAssessmentCycles.length === 0)
      return <CircularProgress />;

    // console.log(
    //   'toJS(localState.userAssessmentCycles)',
    //   toJS(localState.userAssessmentCycles)
    // );

    return (
      <WrappedComponent
        {...props}
        userAssessmentCycles={toJS(localState.userAssessmentCycles)}
      />
    );
  });

export default withUAC;
