export interface SignInType {
  username: string;
  password: string;
}

export interface IResponse {
  error?: string | null;
  data?: any;
  total?: number;
}

export interface SignUpType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
