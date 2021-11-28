import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PageContentComponent } from './components/page/page-content/page-content.component';
import { PageDetailsComponent } from './components/page/page-details/page-details.component';
import { PageFeedbacksComponent } from './components/page/page-feedbacks/page-feedbacks.component';
import { SiteDetailsComponent } from './components/site-details/site-details.component';
import { SiteListComponent } from './components/site-list/site-list.component';
import { PageDetailsResolver } from './resolvers/page-details.resolver';
import { PageFeedbacksResolver } from './resolvers/page-feedbacks.resolver';
import { SiteDetailsResolver } from './resolvers/site-details.resolver';
import { SitesResolver } from './resolvers/sites.resolver';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                redirectTo: 'sites',
                pathMatch: 'full',
            },
            {
                path: 'sites',
                component: SiteListComponent,
                resolve: {
                    sites: SitesResolver
                }
            },
            {
                path: 'sites/:siteUrl',
                component: SiteDetailsComponent,
                resolve: {
                    siteDetails: SiteDetailsResolver
                }
            },
            {
                path: 'sites/:siteUrl/:pageUrl',
                component: PageDetailsComponent,
                resolve: {
                    pageDetails: PageDetailsResolver
                },
                children: [
                    {
                        path: '',
                        redirectTo: 'details',
                        pathMatch: 'full',
                    },
                    {
                        path: 'details',
                        component: PageContentComponent,
                    },
                    {
                        path: 'feedbacks',
                        component: PageFeedbacksComponent,
                        resolve: {
                            pageFeedbacks: PageFeedbacksResolver
                        }
                    }
                ]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
