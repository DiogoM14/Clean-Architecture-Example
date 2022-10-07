import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonListComponent } from './views/pages/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './views/pages/pokemon-detail/pokemon-detail.component';
import { DefaultButtonComponent } from './views/components/default-button/default-button.component';
import { HeaderComponent } from './views/components/header/header.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {DataModule} from "./core/data/data.module";

const appRoutes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'details/:name', component: PokemonDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    DefaultButtonComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    DataModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
