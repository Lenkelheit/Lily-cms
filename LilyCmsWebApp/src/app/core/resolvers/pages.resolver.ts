import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page/page';
import { UserPagesService } from '../services/user-pages.service';

@Injectable()
export class PagesResolver implements Resolve<Page[]> {

    constructor(private pagesService: UserPagesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page[]> {
        let siteUrl = route.params.siteUrl;
        return this.pagesService.getPages(siteUrl);
    }
}
