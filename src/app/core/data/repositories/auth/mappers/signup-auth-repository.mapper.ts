import { Mapper } from '../../../../base/utils/mapper';
import { SignupAuthEntity } from '../entities/signup-auth-entity';
import { AuthModel } from '../../../../domain/models/auth.model';

export class AuthImplementationRepositoryMapper extends Mapper<
  SignupAuthEntity,
  AuthModel
> {
  mapFrom(param: SignupAuthEntity): AuthModel {
    return {
      id: param.idToken,
      email: param.email,
      refreshToken: param.refreshToken,
      expiresIn: param.expiresIn,
    };
  }
}
