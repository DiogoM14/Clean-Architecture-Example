import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupUseCase } from '../../../core/domain/usecases/signup.usecase';
import {
  UserModel,
  UserLoginFormData,
} from '../../../core/domain/models/user.model';
import { LoginUseCase } from '../../../core/domain/usecases/login.usecase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  constructor(
    private signUp: SignupUseCase,
    private login: LoginUseCase,
    private router: Router
  ) {}

  handleSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const userData: UserLoginFormData = {
      email: form.value.email,
      password: form.value.password,
    };

    this.isLoading = true;
    let authObs: Observable<UserModel>;

    if (this.isLoginMode) {
      authObs = this.login.execute(userData);
    } else {
      authObs = this.signUp.execute(userData);
    }

    authObs.subscribe(
      (user) => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
