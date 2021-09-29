import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { SharedModule } from '../shared/shared.module';
import { UserSitesService } from './services/user-sites.service';
import { UserSiteResolver } from './resolvers/user-site.resolver';
import { SiteComponent } from './components/site/site.component';
import { PagesResolver } from './resolvers/pages.resolver';
import { UserPagesService } from './services/user-pages.service';
import { PageComponent } from './components/page/page.component';
import { UserPageResolver } from './resolvers/user-page.resolver';
import { FeedbacksService } from './services/feedbacks.service';
import { AddFeedbackComponent } from './components/modals/add-feedback/add-feedback.component';


@NgModule({
    declarations: [
        CoreComponent,
        SiteComponent,
        PageComponent,
        AddFeedbackComponent,
    ],
    imports: [
        CommonModule,
        CoreRoutingModule,
        SharedModule
    ],
    providers: [
        UserSitesService,
        UserSiteResolver,
        PagesResolver,
        UserPagesService,
        UserPageResolver,
        FeedbacksService,
    ],
    entryComponents: [
        AddFeedbackComponent
    ]
})
export class CoreModule { }
