import { Observable, Subject, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRepository } from '../../../domain/repositories/auth.repository';
import {
  AuthModel,
  UserLoginFormData,
} from '../../../domain/models/auth.model';
import { SignupAuthEntity } from './entities/signup-auth-entity';
import { AuthImplementationRepositoryMapper } from './mappers/signup-auth-repository.mapper';
import { User } from '../../../../views/pages/auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthImplementationRepository extends AuthRepository {
  authMapper = new AuthImplementationRepositoryMapper();
  user = new Subject<User>();

  constructor(private http: HttpClient) {
    super();
  }

  signup(userData: UserLoginFormData): Observable<AuthModel> {
    return this.http
      .post<SignupAuthEntity>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGxkamjEMcoy31al1LpfEXbLRr3Jov7vE',
        {
          email: userData.email,
          password: userData.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        map(this.authMapper.mapFrom),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  signin(userData: UserLoginFormData): Observable<AuthModel> {
    return this.http
      .post<SignupAuthEntity>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGxkamjEMcoy31al1LpfEXbLRr3Jov7vE',
        {
          email: userData.email,
          password: userData.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        map(this.authMapper.mapFrom),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
  }
}
