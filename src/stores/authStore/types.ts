export type SignupUser = {
  user: {
    email: string;
    password: string;
    passwordConfirm: string;
    profile: {
      lastName: string;
      firstName: string;
    };
  };
};

export type ISignInUser = {
  usernameOrEmail: string;
  password: string;
};

export type User = {
  _id: string;
  email: string;
  name: string;
  password: string;
  profile: any;
  status: any;
  roleId: string;
  otpData: {
    otp_enabled: boolean;
    otp_verified: boolean;
  };
};
