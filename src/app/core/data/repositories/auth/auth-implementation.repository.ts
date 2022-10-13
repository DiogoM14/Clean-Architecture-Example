import {catchError, Observable, Subject, tap, throwError} from 'rxjs';
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
import { environment } from '../../../../../environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthImplementationRepository extends AuthRepository {
  authMapper = new AuthImplementationRepositoryMapper();
  user = new Subject<UserModel>;
  apiKey: string;

  constructor(private http: HttpClient, private cookies: CookieService) {
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
      .pipe(
        map(this.authMapper.mapFrom),
        tap((user) => this.handleAuthentication(user)),
        (catchError((errorMessage) => {
          let error = "An unknown error occurred!";

          if (!errorMessage.error || !errorMessage.error.error) {
            return throwError(errorMessage);
          }

          switch (errorMessage.error.error.message) {
            case 'EMAIL_EXISTS':
              error = 'This email exists already';
              break;
          }

          return throwError(error);
        }
      )))
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
        (catchError((errorMessage) => {
            let error = "An unknown error occurred!";

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
          }
        ))
      );
  }

  getLoggedInUser() {
    return this.user;
  }

  private handleAuthentication(user: UserModel) {
    this.cookies.set('email', user.email);
    this.user.next(user);
  }
}
