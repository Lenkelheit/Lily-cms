import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { Site } from 'src/app/shared/models/site/site';
import { SiteDetails } from 'src/app/shared/models/site/site-details';
import { EditSiteComponent } from '../../modals/edit-site/edit-site.component';
import { EditSite } from '../../models/edit-site';
import { EntityType } from '../../models/enums/entity-type';
import { EntityOperationsService } from '../../services/entity-operations.service';

@Component({
    selector: 'app-site-details',
    templateUrl: './site-details.component.html',
    styleUrls: ['./site-details.component.scss']
})
export class SiteDetailsComponent implements OnInit {

    site: SiteDetails;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
        private entityOperationsService: EntityOperationsService,
        private toastrService: ToastrService
    ) { }

    ngOnInit(): void {
        this.site = this.activatedRoute.snapshot.data.siteDetails;
    }

    editSite() {
        let editSite = Object.assign({}, this.site);
        editSite.pages = null;
        const data: EditSite = {
            site: editSite,
            isNewItem: false,
        };
        const dialogRef = this.dialog.open(EditSiteComponent, {
            width: '800px',
            autoFocus: false,
            data
        });

        dialogRef.afterClosed().pipe(filter((value) => !!value)).subscribe((updatedSite: Site) => {
            Object.assign(this.site, updatedSite);
        });
    }

    deleteSite() {
        this.entityOperationsService.deleteEntity(this.site, EntityType.Site).subscribe(() => {
            this.toastrService.success(`The "${this.site.title}" site has been successfully deleted`, 'Success');
            this.router.navigate(['./admin/sites']);
        }, () => {
            this.toastrService.error(`Failed to delete this site. Please reload the page and try again`, 'Something went wrong');
        });
    }
}
