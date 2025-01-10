import Viewport from 'src/models/viewport';
import { WrappingFunction } from '@shopify/react-compose';
import { observer } from 'mobx-react';
const withHandler: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const { viewportRepository, viewport } = props;

    const onClickPDFFrame = async () => {
      const viewports = await viewportRepository.find({
        filter: {
          userSimulationId: viewport.userSimulationId,
        },
      });

      await Promise.all(
        viewports.map(async (_viewport: Viewport) => {
          const active = _viewport.index === viewport.index;

          const param = {
            filter: {
              _id: _viewport._id,
            },
            update: {
              active: active ? true : false,
            },
          };
          await viewportRepository.update(param);
        })
      );
    };

    const handlers = {
      onClickPDFFrame,
    };

    return <WrappedComponent {...props} {...handlers} />;
  });

export default withHandler;
