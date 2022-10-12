import { UseCase } from '../base/use-case';
import { AuthRepository } from '../repositories/auth.repository';
import { UserModel } from '../models/user.model';

export class GetLoggedInUserUseCase implements UseCase<void, UserModel | null> {
  constructor(private authRepository: AuthRepository) {}

  execute() {
    return this.authRepository.getLoggedInUser();
  }
}
