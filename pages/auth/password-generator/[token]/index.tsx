import { observer } from 'mobx-react';
import type { NextPage } from 'next';
import PasswordGenerator from 'src/ui/pages/PasswordGenerator/PasswordGenerator';
const PasswordGeneratorView: NextPage = () => {
  return <PasswordGenerator />
};

export default observer(PasswordGeneratorView);
