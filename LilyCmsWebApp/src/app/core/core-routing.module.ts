import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { SiteComponent } from './components/site/site.component';
import { CoreComponent } from './core.component';
import { UserSiteResolver } from './resolvers/user-site.resolver';

const routes: Routes = [
    {
        path: '',
        component: CoreComponent,
        children: [
            {
                path: ':siteUrl',
                component: SiteComponent,
                resolve: {
                    siteDetails: UserSiteResolver
                }
            },
            // {
            //     path: ':siteUrl/:pageUrl',
            //     component: PageDetailsComponent,
            //     resolve: {
            //         pageDetails: PageDetailsResolver
            //     }
            // },
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
export class CoreRoutingModule { }
