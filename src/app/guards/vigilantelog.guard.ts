import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VigilantelogGuard implements CanActivate {
  constructor(private cookieService: CookieService, private ruote: Router){}
//en el app.routing se debe poner --canActivate: [VigilantelogGuard]-- en la ruta que necesita esta autorizacion
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie = this.cookieService.check('access_token')  
      if (!cookie) {
        this.ruote.navigate(['/', 'login'])
      }
    return cookie;
  }
  
}
