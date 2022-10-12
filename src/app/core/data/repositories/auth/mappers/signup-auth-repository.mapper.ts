import { Mapper } from '../../../../base/utils/mapper';
import { SignupAuthEntity } from '../entities/signup-auth-entity';
import { UserModel } from '../../../../domain/models/user.model';

export class AuthImplementationRepositoryMapper extends Mapper<
  SignupAuthEntity,
  UserModel
> {
  mapFrom(param: SignupAuthEntity): UserModel {
    const tokenExpirationDate = new Date(
      new Date().getTime() + +param.expiresIn * 1000
    );

    return {
      id: param.idToken,
      email: param.email,
      token: param.idToken,
      tokenExpirationDate,
    };
  }
}
