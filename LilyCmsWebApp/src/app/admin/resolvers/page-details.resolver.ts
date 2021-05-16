import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { PageDetails } from 'src/app/shared/models/page/page-details';
import { PagesService } from '../services/pages.service';

@Injectable()
export class PageDetailsResolver implements Resolve<PageDetails> {
    constructor(private pagesService: PagesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageDetails> {
        const siteUrl = route.params.siteUrl;
        const pageUrl = route.params.pageUrl;

        return this.pagesService.getPageDetails(siteUrl, pageUrl);
    }
}
