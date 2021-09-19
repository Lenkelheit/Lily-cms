import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    returnUrl: string;

    constructor(private authService: AuthService,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
        const user = this.authService.getUser();
        if (user) {
            this.authService.redirectToUrl(this.returnUrl);
        }
    }

    loginWithGoogle(): void {
        this.authService.loginWithGoogle(this.returnUrl);
    }
}
