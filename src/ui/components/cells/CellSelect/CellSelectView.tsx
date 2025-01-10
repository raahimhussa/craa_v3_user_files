import { Select } from '@components';
import axios from 'axios';
import { observer } from 'mobx-react';
import pluralize from 'pluralize';
import { useRootStore } from 'src/stores';

function CellSelectView(props: any) {
  const { column, state } = props;
  const { dialogStore } = useRootStore();
  const optionCollectionName = column.optionCollectionName;
  const collectionName = column.collectionName;
  const singularCollectionName = pluralize.singular(collectionName);

  const options = props[optionCollectionName]?.map((doc: any) => ({
    text: doc[props.column.optionTextField],
    value: doc._id,
  }));

  const accessor = props.column.id;

  const onClickOption = async () => {
    const value = eval(`state.${singularCollectionName}.${accessor}`);
    const body = {
      filter: {
        _id: state[singularCollectionName]._id,
      },
      update: {
        [accessor]: value,
      },
    };

    try {
      await axios.patch(`v1/${collectionName}`, body);
      dialogStore.success();
    } catch (error) {
      dialogStore.failure();
    }
  };

  return (
    <Select
      variant="outlined"
      onClickOption={onClickOption}
      options={options}
      state={state[singularCollectionName]}
      path={accessor}
    />
  );
}
export default observer(CellSelectView);
