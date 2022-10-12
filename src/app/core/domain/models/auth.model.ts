export interface AuthModel {
  id: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
}

export interface UserLoginFormData {
  email: string;
  password: string;
}
