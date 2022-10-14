export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

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
