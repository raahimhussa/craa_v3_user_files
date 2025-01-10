import { IReactionDisposer, makeAutoObservable, toJS } from 'mobx';
import { ISignInUser, User } from './types';
import { LogScreen, SimEvent } from 'src/models/log/types';
import axios, { AxiosResponse } from 'axios';
import { getCookie, removeCookies, setCookies } from 'cookies-next';

import { IStore } from '../types';
import { RootStore } from '../root';
import RouterStore from '../routerStore';
import Swal from 'sweetalert2';
import { Utils } from '@utils';
import _ from 'lodash';

export default class AuthStore implements IStore {
  store: RootStore;
  router: RouterStore;
  loggingIn: boolean = false;
  loggingOut: boolean = false;
  user: User = {
    _id: '',
    email: '',
    name: '',
    password: '',
    roleId: '',
    profile: {},
    status: {},
    otpData: {
      otp_enabled: false,
      otp_verified: false,
    },
  };
  signInUser: ISignInUser = {
    usernameOrEmail: '',
    password: '',
  };

  signUpUser = {
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    profile: {
      authCode: '',
      clientUnitId: '',
      businessUnitId: '',
      title: '',
      monitoring: 0,
      lastName: '',
      firstName: '',
      countryId: '',
      initial: '',
    },
    roleId: '',
  };
  verifiedAuthCode: {
    clientUnitId: string;
  } | null = null;

  mutate: any;

  authHandler: IReactionDisposer | null = null;

  forgotPasswordUser = {
    email: '',
  };

  constructor(store: RootStore) {
    this.store = store;
    this.router = store.routerStore;
    makeAutoObservable(this, {
      store: false,
    });
    // this.authHandler = reaction(
    //   () => !_.isEmpty(this.user),
    //   async (isExistUser) => {
    //     const socketId = this.store.socketStore.socket?.id;
    //     if (isExistUser) {
    //       this.store.socketStore.socket?.emit('login', this.user._id);
    //     } else {
    //       this.store.socketStore.socket?.emit('logout', socketId);
    //     }
    //   }
    // );
  }

  loadData(data: any): void {
    throw new Error('Method not implemented.');
  }

  setForgotPasswordUserField(field: string, value: string) {
    // @ts-ignore
    this.forgotPasswordUser[field] = value;
  }

  *signin(ip: any) {
    axios.defaults.withCredentials = true;

    this.loggingIn = true;

    let res: AxiosResponse | null = null;
    try {
      res = yield axios.post(
        'v1/auth/signin',
        toJS({ ...this.signInUser, ip })
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        error.response?.data.errors.map((error: any) => {
          if (error.detail === 'Passwords do not match.') {
            Swal.fire({
              title: 'Passwords do not match.',
              icon: 'error',
              heightAuto: false,
            });
          } else if (
            error.detail === 'The user does not exist and email is not verified'
          ) {
            Swal.fire({
              title: 'The user does not exist and email is not verified',
              icon: 'error',
              heightAuto: false,
            });
          } else if (error.detail === 'This account is not activated') {
            Swal.fire({
              title: 'This account is not activated.',
              icon: 'error',
              heightAuto: false,
            });
          }
        });

        return null;
      }
    }

    // yield this.updateOnline();
    // console.log(res);
    return {
      res,
    };
  }

  *realSignIn(res: any) {
    const mode = process.env.NODE_ENV;

    const { accessToken, refreshToken, role, user_id } = res!.data;
    if (mode === 'production') {
      setCookies('accessToken', accessToken, { domain: '.hoansoft.com' });
      setCookies('refreshToken', refreshToken, { domain: '.hoansoft.com' });
      setCookies('role', role, { domain: '.hoansoft.com' });
    } else {
      setCookies('accessToken', accessToken);
      setCookies('refreshToken', refreshToken);
      setCookies('role', role);
    }

    yield axios.patch('/v1/users', {
      filter: {
        _id: user_id,
      },
      update: {
        'status.online': true,
        'status.signinAt': new Date(),
      },
    });

    this.loggingIn = false;

    axios.defaults.withCredentials = false;
    if (role === 'SimUser') {
      this.router.go('/home');
    } else if (
      role === 'SuperAdmin' ||
      role === 'Admin' ||
      role === 'SimScorer'
    ) {      
      window.location.href =
        mode === 'production'
          ? 'https://craa-admin-dev-3.hoansoft.com/'
          : 'http://localhost:3001/';
    } else if (role === 'ClientSubAdmin' || role === 'ClientAdmin') {
      window.location.href =
        mode === 'production'
          ? 'https://craa-client-dev-3.hoansoft.com/'
          : 'http://localhost:3002/';
    }
  }

  *checkEmail() {
    try {
      const params = {
        filter: {
          email: this.signUpUser.email,
        },
      };
      const { data } = yield axios.get(`v1/users`, { params });
      return data === '' ? true : false;
    } catch (error) {
      console.log(error);
    }
  }

  *verfiyEmail() {
    const signupUser = _.cloneDeep(this.signUpUser);
    const authCode = signupUser.profile.authCode;
    if (
      !signupUser.email ||
      !signupUser.profile.authCode ||
      !signupUser.profile.countryId ||
      !signupUser.profile.title
    ) {
      Swal.fire({
        title: 'Fill up everything.',
        icon: 'error',
        heightAuto: false,
      });
      return null;
    } else if (!signupUser.name)
      try {
        const { data } = yield axios.get(
          `v1/clientUnits/verifyAuthCode/${authCode}`
        );
        this.verifiedAuthCode = data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          Swal.fire({
            title: 'Error!',
            text: 'Invalid AuthCode!',
            icon: 'error',
            heightAuto: false,
          });
          return null;
        }
      }

    signupUser.profile.clientUnitId = this.verifiedAuthCode?.clientUnitId!;
    const randomString = Utils.makeId(4);
    signupUser.name = 'user-' + randomString;
    signupUser.profile.initial =
      'dk-' + (Math.floor(Math.random() * 90000) + 10000);
    //입력한 정보 디비에 바로 삽입.
    try {
      yield axios.post('v1/auth/signup', signupUser);
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        Swal.fire({
          title: 'Internal Server Error',
          icon: 'error',
        });
        return null;
      }
    }
    try {
      yield axios.post('v1/auth/verifyEmail', signupUser);
    } catch (error) {
      Swal.fire({
        title: 'Email Sending Error!',
        icon: 'error',
        heightAuto: false,
      });
      return null;
    }

    Swal.fire({
      title: 'Check your Email',
      icon: 'success',
      heightAuto: false,
    });
    return true;
  }

  *signup(signUpUser: any) {
    delete signUpUser.passwordConfirm;
    try {
      yield axios.patch('v1/auth/signup', signUpUser);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return Swal.fire({
          title: 'Internal Server Error',
          icon: 'error',
        });
      }
    }
    Swal.fire({
      title: 'Welcome',
      icon: 'success',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.go('/auth/signin');
      }
    });
  }

  done() {
    this.router.go('/auth/signin');
  }

  *logout() {
    const token = getCookie('accessToken');

    const params = {
      headers: { authorization: ('Bearer ' + token) as string },
      withCredentials: true,
    };

    try {
      yield axios.delete(`v1/auth/logout/${token}`, params);
    } catch (error) {
      return Swal.fire({
        title: 'Internal Server Error',
        icon: 'error',
      });
    }
    this.store.logStore.create(
      SimEvent.OnClickLogout,
      LogScreen.SignIn,
      null,
      this.user._id
    );

    this.user = {
      _id: '',
      email: '',
      name: '',
      password: '',
      roleId: '',
      profile: {},
      status: {},
      otpData: {
        otp_enabled: false,
        otp_verified: false,
      },
    };

    removeCookies('accessToken');
    removeCookies('refreshToken');
    removeCookies('role');

    this.router.go('auth/signin');
  }

  *sendPasswordResetEmail(): Generator<Promise<any>, boolean, any> {
    try {
      const result = yield axios.post('v1/auth/forgot-password', this.forgotPasswordUser);

      if(result.data.success) {
        Swal.fire({
            title: 'Password reset link sent!',
            text: 'Please check your email for further instructions.',
            icon: 'success',
            heightAuto: false,
          });      
        return true;
      } else {
        Swal.fire({
          title: 'Error!',
          text: result.data.message,
          icon: 'error',
          heightAuto: false,
        }); 
        
        return false;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Handle error
        console.error(error.message);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong while trying to reset your password. Please try again later.',
          icon: 'error',
          heightAuto: false,
        });        
      }
      return false;
    }
  } 
  
}
