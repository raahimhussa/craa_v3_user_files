import { Agreements, Done, Registration } from '@forms';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useRootStore } from 'src/stores';
import Swal from 'sweetalert2';

const withMeta = (WrappedComponent: any) =>
  observer(({ state, onClickSignup, ...rest }: any) => {
    const { authStore } = useRootStore();
    const steps = [
      {
        label: 'Privacy Policy',
        value: 0,
        render: () => <Agreements state={state} />,
        button: {
          label: 'NEXT',
          onClick: action(() => (state.step = 1)),
          disabled: !state.isChecked,
          loading: state.isLoading,
        },
      },
      {
        label: 'Registration',
        value: 1,
        render: () => <Registration />,
        button: {
          label: 'NEXT',
          onClick: async () => {
            const isValidEmail = await authStore.checkEmail();
            if (!isValidEmail) {
              Swal.fire({
                heightAuto: false,
                title: 'Duplicate email address.',
                text: 'An account with this email adress already exists.',
                icon: 'error',
              });
              return;
            }
            const result = await authStore.verfiyEmail();
            if (result !== null) state.step = state.step + 1;
          },
          disabled: false,
          loading: state.isLoading,
        },
      },
      {
        label: 'Done',
        value: 2,
        render: () => <Done />,
        button: {
          label: 'HOME',
          onClick: () => authStore.done(),
          disabled: false,
          loading: state.isLoading,
        },
      },
    ];

    return <WrappedComponent {...rest} state={state} steps={steps} />;
  });

export default withMeta;
