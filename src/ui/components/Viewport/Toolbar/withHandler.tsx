import Viewport from 'src/models/viewport';
import ViewportStore from 'src/stores/viewportStore';
import { WrappingFunction } from '@shopify/react-compose';
import { observer } from 'mobx-react';
import { useRootStore } from 'src/stores';

const withHandler: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const {
      // viewport: { userSimulationId, index },
      viewportRepository,
      matchMutate,
      state,
    } = props;
    const {
      uiState: { toolbar },
      viewportStore,
    } = useRootStore();
    // function toggleFullScreen() {
    //   if (!document.fullscreenElement) {
    //     document.documentElement.requestFullscreen();
    //     state.fullscreen = true;
    //   } else {
    //     if (document.exitFullscreen) {
    //       document.exitFullscreen();
    //       state.fullscreen = false;
    //     }
    //   }
    // }

    // const onClickFullscreen = async () => {
    //   const viewports = await viewportRepository.find({
    //     filter: {
    //       userSimulationId: userSimulationId,
    //     },
    //   });
    //   await Promise.all(
    //     viewports.map((_viewport: Viewport) => {
    //       const isMounted = index === _viewport.index;
    //       viewportRepository.update({
    //         filter: {
    //           _id: _viewport._id,
    //         },
    //         update: {
    //           isMounted: isMounted,
    //           scale: 2,
    //         },
    //       });
    //     })
    //   );
    //   await toggleFullScreen();
    //   matchMutate('v2/viewports');
    // };

    const onClickCancel = async (viewport: Viewport) => {
      // console.log(viewport._id)
      try {
        //   await viewportRepository.delete({
        //     filter: {
        //       _id: viewport._id,
        //     },
        //   });
        // toolbar.mutate && toolbar.mutate();
        viewportStore.viewports[viewport.index].isDocOpen = false;
        await viewportStore.viewportRepository.update({
          filter: { _id: viewport._id },
          update: { active: false },
        });
        viewportStore.viewports[2].active = false;
        const element = document.querySelector(
          '.viewport2'
        ) as HTMLElement | null;
        if (element != null) {
          element.style.display = 'none';
        }
      } catch (error) {
        alert(JSON.stringify(error));
      }
      // try {
      //   await viewportRepository.update({
      //     filter: {
      //       _id: viewport._id,
      //     },
      //     update: {
      //       isMounted: false,
      //     },
      //   });
      //   toolbar.mutate && toolbar.mutate()
      // } catch (error) {
      //   alert(JSON.stringify(error));
      // }
    };

    const handlers = {
      onClickCancel,
      // onClickFullscreen,
    };

    return <WrappedComponent {...props} {...handlers} />;
  });

export default withHandler;
