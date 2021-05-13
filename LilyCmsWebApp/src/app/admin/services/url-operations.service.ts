import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/utilities/helpers';
import { UrlOwner } from '../models/enums/url-owner';
import { PagesService } from './pages.service';
import { SitesService } from './sites.service';

@Injectable()
export class UrlOperationsService {

    constructor(
        private sitesService: SitesService,
        private pagesService: PagesService
    ) { }

    validateUrlSlug(baseValue: string, urlControl: AbstractControl, urlOwner: UrlOwner, siteId?: string) {
        const urlSlugErrorsAmount = Helpers.getErrorsAmount(urlControl);
        if (urlSlugErrorsAmount === 0 || (urlSlugErrorsAmount === 1 && urlControl.hasError('notUniqueUrl'))) {
            if (urlControl.value !== baseValue) {

                let isUrlFree$: Observable<boolean>;
                switch (urlOwner) {
                    case UrlOwner.Site:
                        isUrlFree$ = this.sitesService.isSiteUrlFree(urlControl.value);
                        break;
                    case UrlOwner.Page:
                        isUrlFree$ = this.pagesService.isPageUrlFree(urlControl.value, siteId);
                        break;
                }

                isUrlFree$.subscribe((isFree: boolean) => {
                    !isFree ? urlControl.setErrors({ notUniqueUrl: true }) : urlControl.setErrors(null);
                });
            } else {
                urlControl.setErrors(null);
            }
        }
    }
}
