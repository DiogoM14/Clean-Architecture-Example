import { UseCase } from '../base/use-case';
import { AuthRepository } from '../repositories/auth.repository';
import { UserModel, UserLoginFormData } from '../models/user.model';

export class SignupUseCase implements UseCase<UserLoginFormData, UserModel> {
  constructor(private authRepository: AuthRepository) {}

  execute(userData: UserLoginFormData) {
    return this.authRepository.signup(userData);
  }
}
