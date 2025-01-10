import { observer, useLocalObservable } from 'mobx-react';
import PasswordGenerator from 'src/ui/components/forms/PasswordGenerator/PasswordGenerator';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Utils } from '@utils';
function PasswordGeneratorView({}) {
  const router = useRouter();
  const token = router.query.token as string;
  const localState: any = useLocalObservable(() => ({
    signupUser: null,
  }));

  useEffect(() => {
    async function verifyToken() {
      const signupUser: any =
        token &&
        (await jwt.verify(
          token,
          '283f01ccce922bcc2399e7f8ded981285963cec349daba382eb633c1b3a5f282'
        ));
      // const randomString = Utils.makeId(4);
      if (signupUser) {
        delete signupUser.iat;
        delete signupUser.exp;
        // signupUser.name = 'user-' + randomString;
        signupUser.emailVerification = new Date();
      }
      localState.signupUser = signupUser;
    }

    verifyToken();
  }, [token]);

  if (!localState.signupUser) return null;
  return <PasswordGenerator signupUser={localState.signupUser} />;
}
export default observer(PasswordGeneratorView);
