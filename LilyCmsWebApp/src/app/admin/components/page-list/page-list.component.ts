import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { ConfirmComponent } from 'src/app/shared/modals/confirm/confirm.component';
import { ConfirmationDialogData } from 'src/app/shared/models/confirmation-dialog-data';
import { ConfirmationDialogResult } from 'src/app/shared/models/enums/confirmation-dialog-result';
import { Page } from 'src/app/shared/models/page/page';
import { PageDetails } from 'src/app/shared/models/page/page-details';
import { Site } from 'src/app/shared/models/site/site';
import { EditPageComponent } from '../../modals/edit-page/edit-page.component';
import { EditPage } from '../../models/edit-page';
import { PagesService } from '../../services/pages.service';

@Component({
    selector: 'app-page-list',
    templateUrl: './page-list.component.html',
    styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
    @Input() pages: PageDetails[];
    @Input() site: Site;

    columnsToDisplay = ['id', 'title', 'description', 'urlSlug', 'enabled', 'open', 'edit', 'delete'];

    constructor(
        private dialog: MatDialog,
        private pagesService: PagesService,
        private toastrService: ToastrService
    ) { }

    ngOnInit(): void {
    }

    addOrUpdatePage(page: Page = null) {
        const isNewItem = !page;
        const data: EditPage = {
            page: isNewItem ? { siteId: this.site.id } as Page : Object.assign({}, page),
            isNewItem: isNewItem,
            siteUrl: this.site.urlSlug
        };
        const dialogRef = this.dialog.open(EditPageComponent, {
            width: '800px',
            autoFocus: false,
            data
        });

        dialogRef.afterClosed().pipe(filter((value) => !!value)).subscribe((updatedPage: Page) => {
            if (isNewItem) {
                this.pages = [...this.pages, updatedPage];
            } else {
                Object.assign(page, updatedPage);
            }
        });
    }

    deletePage(page: Page) { // todo: maybe move to Page operations service
        const data: ConfirmationDialogData = {
            title: 'Delete Page?',
            question: `Are you sure you want to delete the "${page.title}" page?`,
            submitText: 'Yes',
            cancelText: 'No'
        };
        const dialogRef = this.dialog.open(ConfirmComponent, {
            autoFocus: false,
            data
        });

        dialogRef.afterClosed().pipe(filter(result => result === ConfirmationDialogResult.Submitted)).subscribe((result: ConfirmationDialogResult) => {
            this.pagesService.deletePage(page.id).subscribe(() => {
                this.pages = this.pages.filter(s => s.id !== page.id);
                this.toastrService.success(`The "${page.title}" page has been successfully deleted`, 'Success');
            }, () => {
                this.toastrService.error(`Failed to delete page. Please reload the page and try again`, 'Something went wrong');
            });
        });

    }
}
