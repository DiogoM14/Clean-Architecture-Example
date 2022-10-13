import { Observable, Subject } from 'rxjs';
import { UserModel, UserLoginFormData } from '../models/user.model';

export abstract class AuthRepository {
  abstract signup(userData: UserLoginFormData): Observable<UserModel>;
  abstract login(userData: UserLoginFormData): Observable<UserModel>;
  abstract getLoggedInUser(): Subject<UserModel>;
}
