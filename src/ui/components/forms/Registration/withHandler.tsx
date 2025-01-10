import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

const withHandler = (WrappedComponent: any) =>
  observer(({ state, ...rest }: any) => {
    const Joi = require('joi');
    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
    });

    const changeEmail = async (value: any) => {
      try {
        await schema.validateAsync({ email: value.target.value });
        runInAction(() => {
          state.user.emailCheck = false;
        });
      } catch (err) {
        runInAction(() => {
          state.user.emailCheck = true;
        });
      }
    };
    return (
      <WrappedComponent {...rest} changeEmail={changeEmail} state={state} />
    );
  });

export default withHandler;
