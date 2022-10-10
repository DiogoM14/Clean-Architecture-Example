import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonListComponent } from './views/pages/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './views/pages/pokemon-detail/pokemon-detail.component';
import { DefaultButtonComponent } from './views/components/default-button/default-button.component';
import { HeaderComponent } from './views/components/header/header.component';
import { RouterModule, Routes } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { DataModule } from "./core/data/data.module";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { FormsModule } from "@angular/forms";

const appRoutes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'details/:name', component: PokemonDetailComponent }
];

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

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
    HttpClientModule,
    DataModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
