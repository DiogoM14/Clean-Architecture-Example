import { Observable } from 'rxjs';
import { AuthModel, UserLoginFormData } from '../models/auth.model';

export abstract class AuthRepository {
  abstract signup(userData: UserLoginFormData): Observable<AuthModel>;
}
