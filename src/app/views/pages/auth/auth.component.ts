import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupUsecase } from '../../../core/domain/usecases/signup-auth.usecase';
import {
  AuthModel,
  UserLoginFormData,
} from '../../../core/domain/models/auth.model';
import { SigninUsecase } from '../../../core/domain/usecases/signin-auth.usecase';
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

  constructor(
    private signupService: SignupUsecase,
    private signinService: SigninUsecase,
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
    let authObs: Observable<AuthModel>;

    if (this.isLoginMode) {
      authObs = this.signinService.execute(userData);
    } else {
      authObs = this.signupService.execute(userData);
    }

    authObs.subscribe((res) => {
      this.isLoading = false;
      this.router.navigate(['/']);
    });

    form.reset();
  }
}
