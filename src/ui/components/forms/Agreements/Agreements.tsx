import { withFind } from '@hocs';
import compose from '@shopify/react-compose';
import AgreementsView from './AgreementsView';

const getFilter = () => {
  return {
    kind: 'privacyPolicy',
    key: 'signup',
    isDeleted: false,
  };
};

export default compose<any>(
  withFind({
    collectionName: 'agreements',
    getFilter: getFilter,
  })
)(AgreementsView);
