import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Site } from 'src/app/shared/models/site';
import { AddSiteComponent } from '../../modals/add-site/add-site.component';
import { filter } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';

@Component({
    selector: 'app-site-list',
    templateUrl: './site-list.component.html',
    styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {

    sites: Site[];
    columnsToDisplay = ['id', 'title', 'description', 'urlSlug', 'enabled'];

    @ViewChild('sitesTable') sitesTable: MatTable<any>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.sites = this.activatedRoute.snapshot.data.sites || [];
    }

    addSite() {
        const dialogRef = this.dialog.open(AddSiteComponent, {
            width: '800px',
            autoFocus: false,
            data: this.sites.map(s => s.urlSlug)
        });

        dialogRef.afterClosed().pipe(filter((value) => !!value)).subscribe((newSite: Site) => {
            this.sites.push(newSite);
            this.sitesTable.renderRows();
        });
    }
}
