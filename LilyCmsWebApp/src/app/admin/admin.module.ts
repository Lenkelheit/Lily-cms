import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SiteListComponent } from './components/site-list/site-list.component';
import { SitesService } from './services/sites.service';
import { SitesResolver } from './resolvers/sites.resolver';
import { SharedModule } from '../shared/shared.module';
import { EditSiteComponent } from './modals/edit-site/edit-site.component';
import { PagesService } from './services/pages.service';
import { PagesResolver } from './resolvers/pages.resolver';
import { PageListComponent } from './components/page-list/page-list.component';
import { SiteDetailsComponent } from './components/site-details/site-details.component';
import { SiteDetailsResolver } from './resolvers/site-details.resolver';
import { EditPageComponent } from './modals/edit-page/edit-page.component';
import { SiteOperationsService } from './services/site-operations.service';
import { UrlOperationsService } from './services/url-operations.service';


@NgModule({
    declarations: [
        AdminComponent,
        SiteListComponent,
        EditSiteComponent,
        PageListComponent,
        SiteDetailsComponent,
        EditPageComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ],
    providers: [
        SitesService,
        SitesResolver,
        SiteDetailsResolver,
        SiteOperationsService,
        UrlOperationsService,
        PagesService,
        PagesResolver
    ],
    entryComponents: [
        EditSiteComponent,
        EditPageComponent
    ],
})
export class AdminModule { }
