import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PageDetails } from 'src/app/shared/models/page/page-details';
import { UserPagesService } from '../services/user-pages.service';

@Injectable()
export class UserPageResolver implements Resolve<PageDetails> {

    constructor(private pagesService: UserPagesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageDetails> {
        const siteUrl = route.params.siteUrl;
        const pageUrl = route.params.pageUrl;

        return this.pagesService.getUserPageDetails(siteUrl, pageUrl);
    }
}
