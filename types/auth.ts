export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface IJurisdiction {
  state: string;
  countryCode: string;
  country: string;
  flagUrl: string;
}

export interface IUser {
  id: string;
  salutationType: "MR" | "MS" | "MRS" | "DR" | "PROF";
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER";
  orgUnit: string;
  designation: string;
  profilePicture: string;
  jurisdiction: IJurisdiction;
  isActive: Boolean;
}

export interface IForgetPasswordPayload {
  forgetPasswordInput: {
    email: string;
  };
}

export interface ISetPasswordPayload {
  newPassword: string;
  confirmNewPassword: string;
}
