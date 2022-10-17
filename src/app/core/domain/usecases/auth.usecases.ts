import { User, UserLoginFormData, UserModel } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

export class AuthUseCases {
  login(userData: UserLoginFormData): Observable<UserModel> {
    return new Observable<UserModel>();
  }

  signup(userData: UserLoginFormData): Observable<UserModel> {
    return new Observable<UserModel>();
  }

  getLoggedInUsers(): BehaviorSubject<User | null> {
    return new BehaviorSubject<User | null>(null);
  }

  isAuthenticated(): boolean {
    return false;
  }

  logout(): void {}

  autoLogin(): void {}

  autoLogout(expirationDuration: number): void {}
}
