import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageFeedback } from 'src/app/shared/models/related-page-info/page-feedback';

@Component({
    selector: 'app-page-feedbacks',
    templateUrl: './page-feedbacks.component.html',
    styleUrls: ['./page-feedbacks.component.scss']
})
export class PageFeedbacksComponent implements OnInit {

    pageFeedbacks: PageFeedback[];
    goodFeedbacksCount: number;

    constructor(
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.pageFeedbacks = this.activatedRoute.snapshot.data.pageFeedbacks || [];
        this.goodFeedbacksCount = this.pageFeedbacks.filter(e => e.vote).length;
    }
}
