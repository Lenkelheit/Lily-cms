import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { SiteDetails } from 'src/app/shared/models/site/site-details';
import { UserSitesService } from '../services/user-sites.service';

@Injectable()
export class UserSiteResolver implements Resolve<SiteDetails> {

    constructor(private sitesService: UserSitesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SiteDetails> {
        let siteUrl = route.params.siteUrl;
        return this.sitesService.getUserSiteDetails(siteUrl);
    }
}
