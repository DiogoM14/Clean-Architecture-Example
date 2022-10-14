import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { AuthUseCases } from '../../../core/domain/usecases/auth.usecases';

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
    private auth: AuthUseCases
  ) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.userSub = this.auth.getLoggedInUsers().subscribe((user) => {
      if (user !== null) {
        this.isUserAuthenticated = !!user;
        this.userEmail = user?.email;
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  handleLogout() {
    this.isUserAuthenticated = !this.isUserAuthenticated;
  }
}
