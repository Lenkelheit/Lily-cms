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
import { PageListComponent } from './components/page-list/page-list.component';
import { SiteDetailsComponent } from './components/site-details/site-details.component';
import { SiteDetailsResolver } from './resolvers/site-details.resolver';
import { EditPageComponent } from './modals/edit-page/edit-page.component';
import { EntityOperationsService } from './services/entity-operations.service';
import { UrlOperationsService } from './services/url-operations.service';
import { PageDetailsComponent } from './components/page-details/page-details.component';
import { PageDetailsResolver } from './resolvers/page-details.resolver';
import { PageContentComponent } from './components/page-content/page-content.component';
import { EditPageAreaComponent } from './modals/edit-page-area/edit-page-area.component';


@NgModule({
    declarations: [
        AdminComponent,
        SiteListComponent,
        EditSiteComponent,
        PageListComponent,
        SiteDetailsComponent,
        EditPageComponent,
        PageDetailsComponent,
        PageContentComponent,
        EditPageAreaComponent
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
        EntityOperationsService,
        UrlOperationsService,
        PagesService,
        PageDetailsResolver
    ],
    entryComponents: [
        EditSiteComponent,
        EditPageComponent,
        EditPageAreaComponent
    ],
})
export class AdminModule { }
