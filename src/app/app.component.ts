import { Component, OnInit } from '@angular/core';
import { AuthUseCases } from './core/domain/usecases/auth.usecases';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthUseCases) {}

  ngOnInit() {
    this.auth.autoLogin();
  }
}
