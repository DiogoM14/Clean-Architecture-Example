import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthImplementationRepository } from '../../../core/data/repositories/auth/auth-implementation.repository';
import { GetLoggedInUserUseCase } from '../../../core/domain/usecases/get-logged-in-user.usecase';
import { UserModel } from '../../../core/domain/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userSub: any = null;
  isUserAuthenticated: boolean = false;

  constructor(
    public translate: TranslateService,
    public getLoggedInUser: GetLoggedInUserUseCase
  ) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.userSub = this.getLoggedInUser.execute();
    if (this.userSub !== null) {
      this.isUserAuthenticated = true;
    }
  }

  handleLogout() {
    this.isUserAuthenticated = !this.isUserAuthenticated;
  }
}
