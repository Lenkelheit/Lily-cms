import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageFeedback } from 'src/app/shared/models/related-page-info/page-feedback';
import { environment } from 'src/environments/environment';

@Injectable()
export class FeedbacksService {
    baseUrl = environment.baseUrl;

    static readonly PageFeedback = 'pageFeedback';

    constructor(private http: HttpClient) { }

    getPageFeedback(pageId: string): PageFeedback {
        const pageFeedback = localStorage.getItem(`${FeedbacksService.PageFeedback}-${pageId}`);
        return pageFeedback ? JSON.parse(pageFeedback) : null;
    }

    setPageFeedback(pageId: string, pageFeedback: PageFeedback) {
        localStorage.setItem(`${FeedbacksService.PageFeedback}-${pageId}`, JSON.stringify(pageFeedback));
    }

    clearPageFeedback(pageId: string) {
        localStorage.removeItem(`${FeedbacksService.PageFeedback}-${pageId}`);
    }

    addOrUpdatePageFeedback(pageFeedback: PageFeedback): Observable<PageFeedback> {
        return this.http.post<PageFeedback>(`${this.baseUrl}/api/feedbacks`, pageFeedback);
    }

    deletePageFeedback(pageFeedbackId: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/api/feedbacks/${pageFeedbackId}`);
    }
}
