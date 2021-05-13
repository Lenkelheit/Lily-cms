import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from 'src/app/shared/models/site/site';
import { SiteDetails } from 'src/app/shared/models/site/site-details';
import { environment } from 'src/environments/environment';

@Injectable()
export class SitesService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getSites(): Observable<Site[]> {
        return this.http.get<Site[]>(`${this.baseUrl}/api/sites`);
    }

    addOrUpdateSite(site: Site): Observable<Site> {
        return this.http.post<Site>(`${this.baseUrl}/api/sites`, site);
    }

    deleteSite(siteId: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/api/sites/${siteId}`);
    }

    getSiteDetails(siteUrl: string): Observable<SiteDetails> {
        return this.http.get<SiteDetails>(`${this.baseUrl}/api/sites/${siteUrl}`);
    }

    isSiteUrlFree(siteUrl: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}/api/sites/isUrlFree?siteUrl=${siteUrl}`);
    }

}
