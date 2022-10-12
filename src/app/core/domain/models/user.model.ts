export interface UserModel {
  id: string;
  email: string;
  token: string;
  tokenExpirationDate: Date;
}

export interface UserLoginFormData {
  email: string;
  password: string;
}
