import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { AdminComponent } from './admin.component';
import { PageDetailsComponent } from './components/page-details/page-details.component';
import { SiteDetailsComponent } from './components/site-details/site-details.component';
import { SiteListComponent } from './components/site-list/site-list.component';
import { PageDetailsResolver } from './resolvers/page-details.resolver';
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
                }
            },
            {
                path: "**",
                component: NotFoundComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
