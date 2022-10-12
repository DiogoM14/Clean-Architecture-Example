import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userEmail: any;
  isUserAuthenticated: boolean = false;

  constructor(
    public translate: TranslateService,
    private cookies: CookieService
  ) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    this.userEmail = this.cookies.get('email');
  }

  ngOnInit() {}

  handleLogout() {
    this.cookies.deleteAll();
    this.isUserAuthenticated = !this.isUserAuthenticated;
  }
}
