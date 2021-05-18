import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page/page';
import { PageDetails } from 'src/app/shared/models/page/page-details';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserPagesService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getPages(siteUrl: string): Observable<Page[]> {
        return this.http.get<Page[]>(`${this.baseUrl}/api/core/pages/${siteUrl}`);
    }

    getUserPageDetails(siteUrl: string, pageUrl: string): Observable<PageDetails> {
        return this.http.get<PageDetails>(`${this.baseUrl}/api/core/pages/${siteUrl}/${pageUrl}`);
    }
}
