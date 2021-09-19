import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    user: SocialUser | null;

    constructor(private router: Router,
        private authService: AuthService,
        private socialAuthService: SocialAuthService) { }

    ngOnInit(): void {
        this.socialAuthService.authState.subscribe((user: SocialUser) => {
            this.user = user;
        });
    }

    login(): void {
        this.router.navigate(['./login'], { queryParams: { returnUrl: this.router.url } });
    }

    signOut(): void {
        this.authService.signOut();
    }
}
