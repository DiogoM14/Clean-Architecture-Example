import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { GetLoggedInUserUseCase } from '../../../core/domain/usecases/get-logged-in-user.usecase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription = new Subscription();
  isUserAuthenticated = false;
  userEmail = '';

  constructor(
    public translate: TranslateService,
    private cookies: CookieService,
    private getUser: GetLoggedInUserUseCase
  ) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    // this.userEmail = this.cookies.get('email');
  }

  ngOnInit() {
    this.userSub = this.getUser.execute().subscribe((user) => {
      this.isUserAuthenticated = !!user;
      this.userEmail = this.cookies.get('email');
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  handleLogout() {
    // this.cookies.deleteAll();
    this.isUserAuthenticated = !this.isUserAuthenticated;
  }
}
