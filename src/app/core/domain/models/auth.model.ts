export interface AuthModel {
  id: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
  idToken: string;
}

export interface UserLoginFormData {
  email: string;
  password: string;
}
