import ButtonGroup from '@mui/material/ButtonGroup';
import pluralize from 'pluralize';
import axios from 'axios';
import { Alert } from '@utils';
import { observer } from 'mobx-react';
import { CellProps } from 'react-table';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { red, green } from '@mui/material/colors';

function CellButtonsView(props: CellProps<any>) {
  const { column, matchMutate }: any = props;
  const collectionName = column.collectionName;
  const singularCollectionName = pluralize.singular(collectionName);
  const modalKey = column.modalKey || singularCollectionName;

  const _matchMutate = () => {
    matchMutate(collectionName);
  };

  const onClickEdit = () => {
    eval(`modalStore.${modalKey}.isVisible = true`);
    eval(`modalStore.${modalKey}.isEditMode = true`);
    eval(`modalStore.${modalKey}.payload.row = props.row.original`);
  };

  const onClickDelete = async () => {
    try {
      await axios.patch(`v2/${collectionName}`, {
        filter: { _id: props.row.original._id },
        update: {
          isDeleted: true,
        },
      });
      _matchMutate();
    } catch (error) {
      Alert.handle(error);
    }
  };

  return (
    <ButtonGroup>
      <IconButton onClick={onClickEdit}>
        <Edit htmlColor={green[500]} />
      </IconButton>
      <IconButton onClick={onClickDelete}>
        <Delete htmlColor={red[500]} />
      </IconButton>
    </ButtonGroup>
  );
}
export default observer(CellButtonsView);
