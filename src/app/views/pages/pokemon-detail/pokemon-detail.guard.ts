import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthUseCases } from '../../../core/domain/usecases/auth.usecases';

@Injectable({ providedIn: 'root' })
export class PokemonDetailGuard implements CanActivate {
  constructor(private auth: AuthUseCases, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree {
    const isAuth = this.auth.isAuthenticated();

    if (isAuth) {
      return true;
    }

    return this.router.createUrlTree(['/auth']);
  }
}
