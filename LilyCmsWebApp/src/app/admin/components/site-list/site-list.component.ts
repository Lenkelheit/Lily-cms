import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Site } from 'src/app/shared/models/site';
import { EditSiteComponent } from '../../modals/add-site/edit-site.component';
import { filter } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';
import { EditSite } from '../../models/edit-site';
import { SitesService } from '../../services/sites.service';
import { ConfirmationDialogData } from 'src/app/shared/models/confirmation-dialog-data';
import { ConfirmComponent } from 'src/app/shared/modals/confirm/confirm.component';
import { ConfirmationDialogResult } from 'src/app/shared/models/enums/confirmation-dialog-result';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-site-list',
    templateUrl: './site-list.component.html',
    styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {

    sites: Site[];
    columnsToDisplay = ['id', 'title', 'description', 'urlSlug', 'enabled', 'edit', 'delete'];

    constructor(
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
        private sitesService: SitesService,
        private toastrService: ToastrService
    ) { }

    ngOnInit(): void {
        this.sites = this.activatedRoute.snapshot.data.sites || [];
    }

    addOrUpdateSite(site: Site = null) {
        const usedUniqueUrls = this.sites.map(s => s.urlSlug);
        const isNewItem = !site;
        const data: EditSite = {
            site: isNewItem ? {} as Site : Object.assign({}, site),
            isNewItem: isNewItem,
            usedUniqueUrls: isNewItem ? usedUniqueUrls : usedUniqueUrls.filter(u => u !== site.urlSlug)
        };
        const dialogRef = this.dialog.open(EditSiteComponent, {
            width: '800px',
            autoFocus: false,
            data
        });

        dialogRef.afterClosed().pipe(filter((value) => !!value)).subscribe((updatedSite: Site) => {
            if (isNewItem) {
                this.sites = [...this.sites, updatedSite];
            } else {
                Object.assign(site, updatedSite);
            }
        });
    }

    deleteSite(site: Site) {
        const data: ConfirmationDialogData = {
            title: 'Delete Site?',
            question: `Are you sure you want to delete the "${site.title}" site?`,
            submitText: 'Yes',
            cancelText: 'No'
        };
        const dialogRef = this.dialog.open(ConfirmComponent, {
            autoFocus: false,
            data
        });

        dialogRef.afterClosed().pipe(filter(result => result === ConfirmationDialogResult.Submitted)).subscribe((result: ConfirmationDialogResult) => {
            this.sitesService.deleteSite(site.id).subscribe(() => {
                this.sites = this.sites.filter(s => s.id !== site.id);
                this.toastrService.success(`The "${site.title}" site has been successfully deleted`, 'Success');
            }, () => {
                this.toastrService.error(`Failed to delete site. Please reload the page and try again`, 'Something went wrong');
            });
        });

    }
}
