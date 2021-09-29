import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ContentType } from 'src/app/shared/models/enums/content-type';
import { Page } from 'src/app/shared/models/page/page';
import { PageDetails } from 'src/app/shared/models/page/page-details';
import { PageFeedback } from 'src/app/shared/models/related-page-info/page-feedback';
import { FeedbacksService } from '../../services/feedbacks.service';
import { AddFeedbackComponent } from '../modals/add-feedback/add-feedback.component';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

    pages: Page[];
    pageDetails: PageDetails;
    pageFeedback: PageFeedback = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
        private feedbacksService: FeedbacksService
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            this.pages = data.pages || [];
            this.pageDetails = data.pageDetails;
            this.pageFeedback = this.feedbacksService.getPageFeedback(this.pageDetails.id);
        });
    }

    get ContentType() {
        return ContentType;
    }

    onPageVote(voteType: boolean) { // delete vote
        if (this.pageFeedback?.vote === voteType) {
            this.feedbacksService.deletePageFeedback(this.pageFeedback.id).subscribe(() => {
                this.pageFeedback = null;
                this.feedbacksService.clearPageFeedback(this.pageDetails.id);
            });
        } else {
            // create new vote
            const newPageFeedback = {
                vote: voteType,
                pageId: this.pageDetails.id
            } as PageFeedback;
            this.updatePageVote(newPageFeedback);
        }
    }

    updatePageVote(newPageFeedback: PageFeedback) {
        const dialogRef = this.dialog.open(AddFeedbackComponent, {
            width: '800px',
            autoFocus: false,
            data: newPageFeedback
        });

        dialogRef.afterClosed().pipe(filter((value) => !!value)).subscribe((feedback: PageFeedback) => {
            this.pageFeedback = feedback;
            this.savePageFeedback();
        });
    }

    private savePageFeedback() {
        this.feedbacksService.addOrUpdatePageFeedback(this.pageFeedback).subscribe((feedback: PageFeedback) => {
            this.pageFeedback = feedback;
            this.feedbacksService.setPageFeedback(this.pageDetails.id, this.pageFeedback);
        });
    }
}
