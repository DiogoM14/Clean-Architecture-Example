import { UseCase } from '../base/use-case';
import { AuthRepository } from '../repositories/auth.repository';
import { AuthModel, UserLoginFormData } from '../models/auth.model';

export class SignupUsecase implements UseCase<UserLoginFormData, AuthModel> {
  constructor(private authRepository: AuthRepository) {}

  execute(userData: UserLoginFormData) {
    return this.authRepository.signup(userData);
  }
}
