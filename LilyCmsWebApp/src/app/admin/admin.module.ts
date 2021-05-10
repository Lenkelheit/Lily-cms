import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SiteListComponent } from './components/site-list/site-list.component';
import { SitesService } from './services/sites.service';
import { SitesResolver } from './resolvers/sites.resolver';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        AdminComponent,
        SiteListComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ],
    providers: [
        SitesService,
        SitesResolver
    ]
})
export class AdminModule { }
