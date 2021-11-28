import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './services/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Lily CMS';

    constructor(public loaderService: LoaderService,
        private router: Router,
    ) { }

    isOnRoute(route: string): boolean {
        return this.router.url.includes(route);
    }
}
