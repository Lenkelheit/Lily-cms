import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PageFeedback } from 'src/app/shared/models/related-page-info/page-feedback';
import { PagesService } from '../services/pages.service';

@Injectable()
export class PageFeedbacksResolver implements Resolve<PageFeedback[]> {

    constructor(private pagesService: PagesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageFeedback[]> {
        const pageId = this.pagesService.page.id;
        return this.pagesService.getPageFeedbacks(pageId);
    }
}
