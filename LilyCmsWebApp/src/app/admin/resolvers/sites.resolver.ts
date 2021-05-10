import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Site } from 'src/app/shared/models/site';
import { SitesService } from '../services/sites.service';

@Injectable()
export class SitesResolver implements Resolve<Site[]> {

    constructor(private sitesService: SitesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Site[]> {
        return this.sitesService.getSites();
    }
}
