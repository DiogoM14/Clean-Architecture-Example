import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  UserModel,
  UserLoginFormData,
  User,
} from '../../../domain/models/user.model';
import { SignupAuthEntity } from './entities/signup-auth-entity';
import { AuthImplementationRepositoryMapper } from './mappers/signup-auth-repository.mapper';
import { environment } from '../../../../../environment';
import { AuthUseCases } from '../../../domain/usecases/auth.usecases';

@Injectable({
  providedIn: 'root',
})
export class AuthImplementationRepository implements AuthUseCases {
  authMapper = new AuthImplementationRepositoryMapper();

  user = new BehaviorSubject<User | null>(null);
  apiKey: string;

  constructor(private http: HttpClient) {
    this.apiKey = environment.apiKey;
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
        tap((user) => this.handleAuthentication(user)),
        catchError((errorMessage) => {
          let error = 'An unknown error occurred!';

          if (!errorMessage.error || !errorMessage.error.error) {
            return throwError(errorMessage);
          }

          switch (errorMessage.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              error = 'This email does not exist.';
              break;
            case 'INVALID_PASSWORD':
              error = 'This password is not correct.';
              break;
          }

          return throwError(error);
        })
      );
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
      .pipe(
        map(this.authMapper.mapFrom),
        tap((user) => this.handleAuthentication(user)),
        catchError((errorMessage) => {
          let error = 'An unknown error occurred!';

          if (!errorMessage.error || !errorMessage.error.error) {
            return throwError(errorMessage);
          }

          switch (errorMessage.error.error.message) {
            case 'EMAIL_EXISTS':
              error = 'This email exists already';
              break;
          }

          return throwError(error);
        })
      );
  }

  getLoggedInUsers() {
    return this.user;
  }

  private handleAuthentication(userData: UserModel) {
    const instantiatedUser = new User(
      userData.email,
      userData.id,
      userData.token,
      userData.tokenExpirationDate
    );

    this.user.next(instantiatedUser);
  }
}
