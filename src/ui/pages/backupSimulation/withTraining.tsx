import { WrappingFunction } from '@shopify/react-compose';
import { Alert } from '@utils';
import { observer, useLocalObservable } from 'mobx-react';
import { useEffect } from 'react';
import { useRootStore } from 'src/stores';
import _ from 'lodash';
import { Progress } from '@components';
import { action } from 'mobx';

const withTraining: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    // const { simulationId, assessmentCycleId, user } = props;

    // const { screenRecorderStore, trainingRoomRepository } = useRootStore();

    // const localState: { trainingRoom: any; isLoading: boolean } =
    //   useLocalObservable(() => ({
    //     isLoading: true,
    //     trainingRoom: null,
    //   }));

    // useEffect(() => {
    //   const create = action(async () => {
    //     localState.isLoading = true;
    //     const body = {
    //       assessmentCycleId,
    //       simulationId,
    //       userId: user._id,
    //     };
    //     const params = {
    //       filter: body,
    //     };
    //     try {
    //       localState.trainingRoom = await trainingRoomRepository.findOne(
    //         params
    //       );
    //     } catch (error) {
    //       Alert.handle(error);
    //     }

    //     if (_.isEmpty(localState.trainingRoom)) {
    //       localState.trainingRoom = await trainingRoomRepository.create(body);
    //     }

    //     if (localState.trainingRoom) {
    //       screenRecorderStore.trainingRoomId = localState.trainingRoom._id;
    //     }

    //     localState.isLoading = false;
    //   });

    //   create();
    // }, []);

    // if (localState.isLoading) return <Progress />;

    return (
      <WrappedComponent
        {...props}
        // trainingRoom={localState.trainingRoom}
      />
    );
  });

export default withTraining;
