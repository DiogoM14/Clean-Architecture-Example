import { Observable } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class AuthImplementationRepository extends AuthRepository {
  authMapper = new AuthImplementationRepositoryMapper();

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
      .pipe(map(this.authMapper.mapFrom));
  }
}
