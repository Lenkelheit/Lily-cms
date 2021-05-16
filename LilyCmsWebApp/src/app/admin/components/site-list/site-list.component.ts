import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Site } from 'src/app/shared/models/site/site';
import { EditSiteComponent } from '../../modals/edit-site/edit-site.component';
import { filter } from 'rxjs/operators';
import { EditSite } from '../../models/edit-site';
import { ToastrService } from 'ngx-toastr';
import { EntityOperationsService } from '../../services/entity-operations.service';
import { EntityType } from '../../models/enums/entity-type';

@Component({
    selector: 'app-site-list',
    templateUrl: './site-list.component.html',
    styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {

    sites: Site[];
    columnsToDisplay = ['id', 'title', 'description', 'urlSlug', 'enabled', 'open', 'edit', 'delete'];

    constructor(
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
        private entityOperationsService: EntityOperationsService,
        private toastrService: ToastrService
    ) { }

    ngOnInit(): void {
        this.sites = this.activatedRoute.snapshot.data.sites || [];
    }

    addOrUpdateSite(site: Site = null) {
        const isNewItem = !site;
        const data: EditSite = {
            site: isNewItem ? {} as Site : Object.assign({}, site),
            isNewItem: isNewItem,
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
        this.entityOperationsService.deleteEntity(site, EntityType.Site).subscribe(() => {
            this.sites = this.sites.filter(s => s.id !== site.id);
            this.toastrService.success(`The "${site.title}" site has been successfully deleted`, 'Success');
        }, () => {
            this.toastrService.error(`Failed to delete site. Please reload the page and try again`, 'Something went wrong');
        });
    }
}
