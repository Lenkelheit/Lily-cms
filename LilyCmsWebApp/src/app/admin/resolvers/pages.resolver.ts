import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page/page';
import { PagesService } from '../services/pages.service';

@Injectable()
export class PagesResolver implements Resolve<Page[]> { // todo: maybe remove it and related stuff

    constructor(private pagesService: PagesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page[]> {
        let siteUrl = route.params.siteUrl;
        return this.pagesService.getPages(siteUrl);
    }
}
