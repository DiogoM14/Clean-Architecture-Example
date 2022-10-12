import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRepository } from '../../../domain/repositories/auth.repository';
import {
  UserModel,
  UserLoginFormData,
} from '../../../domain/models/user.model';
import { SignupAuthEntity } from './entities/signup-auth-entity';
import { AuthImplementationRepositoryMapper } from './mappers/signup-auth-repository.mapper';
import { User } from '../../../../views/pages/auth/user.model';
import { environment } from '../../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthImplementationRepository extends AuthRepository {
  authMapper = new AuthImplementationRepositoryMapper();
  user: any = null;
  apiKey: any;

  constructor(private http: HttpClient) {
    super();

    this.apiKey = environment.apiKey;
  }

  signup(userData: UserLoginFormData): Observable<UserModel> {
    return this.http
      .post<SignupAuthEntity>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
        {
          email: userData.email,
          password: userData.password,
          returnSecureToken: true,
        }
      )
      .pipe(map(this.authMapper.mapFrom));
  }

  login(userData: UserLoginFormData): Observable<UserModel> {
    return this.http
      .post<SignupAuthEntity>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
        {
          email: userData.email,
          password: userData.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        map(this.authMapper.mapFrom),
        tap((user) => this.handleAuthentication(user))
      );
  }

  getLoggedInUser() {
    if (this.user !== null) {
      return this.user;
    } else {
      return null;
    }
  }

  private handleAuthentication(user: UserModel) {
    this.user = user;
  }
}
