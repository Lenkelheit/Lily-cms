import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { SharedModule } from '../shared/shared.module';
import { UserSitesService } from './services/user-sites.service';
import { UserSiteResolver } from './resolvers/user-site.resolver';
import { SiteComponent } from './components/site/site.component';


@NgModule({
    declarations: [
        CoreComponent,
        SiteComponent
    ],
    imports: [
        CommonModule,
        CoreRoutingModule,
        SharedModule
    ],
    providers: [
        UserSitesService,
        UserSiteResolver
    ]
})
export class CoreModule { }
