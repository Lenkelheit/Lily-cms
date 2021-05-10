import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site } from 'src/app/shared/models/site';

@Component({
    selector: 'app-site-list',
    templateUrl: './site-list.component.html',
    styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {

    sites: Site[];

    columnsToDisplay = ['id', 'title', 'description', 'urlSlug', 'enabled'];

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.sites = this.activatedRoute.snapshot.data.sites || [];
    }

}
