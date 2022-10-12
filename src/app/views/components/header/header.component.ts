import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthImplementationRepository } from '../../../core/data/repositories/auth/auth-implementation.repository';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: any;
  isUserAuthenticated: boolean = false;

  constructor(
    public translate: TranslateService,
    public authService: AuthImplementationRepository
  ) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isUserAuthenticated = !!user;
      console.log(!!user);
    });
  }

  ngOnDestroy() {
    this.authService.user.unsubscribe();
  }
}
