import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  User,
  UserLoginFormData,
  UserModel,
} from '../../../domain/models/user.model';
import { SignupAuthEntity } from './entities/signup-auth-entity';
import { AuthImplementationRepositoryMapper } from './mappers/signup-auth-repository.mapper';
import { environment } from '../../../../../environment';
import { AuthUseCases } from '../../../domain/usecases/auth.usecases';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthImplementationRepository implements AuthUseCases {
  authMapper = new AuthImplementationRepositoryMapper();

  user = new BehaviorSubject<User | null>(null);
  apiKey: string;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
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

  autoLogin() {
    // @ts-ignore
    const userData: UserModel = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  getLoggedInUsers() {
    return this.user;
  }

  isAuthenticated() {
    if (this.user.value !== null) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(userData: UserModel) {
    const instantiatedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      userData._tokenExpirationDate
    );

    this.autoLogout(
      userData._tokenExpirationDate.getTime() - new Date().getTime()
    );
    this.user.next(instantiatedUser);
    localStorage.setItem('userData', JSON.stringify(instantiatedUser));
  }
}
