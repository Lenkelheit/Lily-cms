import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { PageDetails } from 'src/app/shared/models/page/page-details';
import { Page } from 'src/app/shared/models/page/page';
import { EditPageComponent } from '../../../modals/edit-page/edit-page.component';
import { EditPage } from '../../../models/edit-page';
import { EntityOperationsService } from '../../../services/entity-operations.service';
import { EntityType } from '../../../models/enums/entity-type';

@Component({
    selector: 'app-page-details',
    templateUrl: './page-details.component.html',
    styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit {
    page: PageDetails;
    siteUrl: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
        private entityOperationsService: EntityOperationsService,
        private toastrService: ToastrService
    ) { }

    ngOnInit(): void {
        this.siteUrl = this.activatedRoute.snapshot.params.siteUrl;
        this.page = this.activatedRoute.snapshot.data.pageDetails;
    }

    editPage() {
        let editPage = Object.assign({}, this.page);
        editPage.pageAreas = null;
        const data: EditPage = {
            page: editPage,
            isNewItem: false,
            siteUrl: this.siteUrl
        };
        const dialogRef = this.dialog.open(EditPageComponent, {
            width: '800px',
            autoFocus: false,
            data
        });

        dialogRef.afterClosed().pipe(filter((value) => !!value)).subscribe((updatedPage: Page) => {
            Object.assign(this.page, updatedPage);
        });
    }

    deletePage() {
        this.entityOperationsService.deleteEntity(this.page, EntityType.Page).subscribe(() => {
            this.toastrService.success(`The "${this.page.title}" page has been successfully deleted`, 'Success');
            this.router.navigate(['./admin/sites', this.siteUrl]);
        }, () => {
            this.toastrService.error(`Failed to delete this page. Please reload the page and try again`, 'Something went wrong');
        });
    }
}
