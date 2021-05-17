import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteDetails } from 'src/app/shared/models/site/site-details';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserSitesService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getUserSiteDetails(siteUrl: string): Observable<SiteDetails> {
        return this.http.get<SiteDetails>(`${this.baseUrl}/api/core/sites/${siteUrl}`);
    }
}
