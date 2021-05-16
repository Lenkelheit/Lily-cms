import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { SiteDetails } from 'src/app/shared/models/site/site-details';
import { SitesService } from '../services/sites.service';

@Injectable()
export class SiteDetailsResolver implements Resolve<SiteDetails> {

    constructor(private sitesService: SitesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SiteDetails> {
        let siteUrl = route.params.siteUrl;
        return this.sitesService.getSiteDetails(siteUrl);
    }
}
