import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  UserLoginFormData,
  UserModel,
} from '../../../core/domain/models/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthUseCases } from '../../../core/domain/usecases/auth.usecases';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  constructor(private router: Router, private auth: AuthUseCases) {}

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
      authObs = this.auth.login(userData);
    } else {
      authObs = this.auth.signup(userData);
    }

    authObs.subscribe(
      (user) => {
        this.isLoading = false;
        this.router.navigate(['/']);

        this.auth.getLoggedInUsers().subscribe((user) => {
          console.log(user?.token);
        });
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
