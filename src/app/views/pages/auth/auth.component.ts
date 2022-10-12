import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupUsecase } from '../../../core/domain/usecases/signup-auth.usecase';
import { UserLoginFormData } from '../../../core/domain/models/auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode = true;

  constructor(private signupService: SignupUsecase) {}

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

    this.signupService.execute(userData).subscribe((res) => console.log(res));

    form.reset();
  }
}
