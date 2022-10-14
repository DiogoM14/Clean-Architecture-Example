import { UserLoginFormData, User, UserModel } from '../models/user.model';
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
}
