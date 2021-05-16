import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page/page';
import { PageDetails } from 'src/app/shared/models/page/page-details';
import { environment } from 'src/environments/environment';

@Injectable()
export class PagesService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getPages(siteUrl: string): Observable<Page[]> {
        return this.http.get<Page[]>(`${this.baseUrl}/api/pages/${siteUrl}`);
    }

    addOrUpdatePage(page: Page): Observable<Page> {
        return this.http.post<Page>(`${this.baseUrl}/api/pages`, page);
    }

    deletePage(pageId: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/api/pages/${pageId}`);
    }

    isPageUrlFree(pageUrl: string, siteId: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}/api/pages/isUrlFree?pageUrl=${pageUrl}&siteId=${siteId}`);
    }

    getPageDetails(siteUrl: string, pageUrl: string): Observable<PageDetails> {
        return this.http.get<PageDetails>(`${this.baseUrl}/api/pages/${siteUrl}/${pageUrl}`);
    }

    savePageContent(pageDetails: PageDetails): Observable<PageDetails> {
        return this.http.post<PageDetails>(`${this.baseUrl}/api/pages/pageContent`, pageDetails);
    }
}
