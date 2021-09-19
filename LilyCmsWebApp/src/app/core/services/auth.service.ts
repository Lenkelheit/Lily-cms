import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/shared/models/auth/auth-request';
import { AuthResult } from 'src/app/shared/models/auth/auth-result';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseUrl = environment.baseUrl;

    static readonly UserKey = 'user';
    static readonly AccessTokenKey = 'accessToken';

    constructor(private http: HttpClient,
        private router: Router,
        private socialAuthService: SocialAuthService) { }

    getUser(): SocialUser {
        const user = localStorage.getItem(AuthService.UserKey);
        return user ? JSON.parse(user) : null;
    }

    setUser(user: SocialUser) {
        localStorage.setItem(AuthService.UserKey, JSON.stringify(user));
    }

    getAccessToken() {
        return localStorage.getItem(AuthService.AccessTokenKey);
    }

    setAccessToken(accessToken: string) {
        localStorage.setItem(AuthService.AccessTokenKey, accessToken);
    }

    loginWithGoogle(returnUrl: string): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user: SocialUser) => {
            const authRequest = {
                idToken: user.idToken,
                provider: user.provider
            } as AuthRequest;
            this.authenticate(authRequest).subscribe((authResult: AuthResult) => {
                this.setUser(user);
                this.setAccessToken(authResult.token);
                this.redirectToUrl(returnUrl);
            });
        });
    }

    redirectToUrl(returnUrl: string) {
        returnUrl ? this.router.navigate([returnUrl]) : this.router.navigate(['/admin']);
    }

    signOut() {
        this.socialAuthService.signOut();
        localStorage.clear();
        this.router.navigate(['./login']);
    }

    authenticate(authRequest: AuthRequest): Observable<AuthResult> {
        return this.http.post<AuthResult>(`${this.baseUrl}/api/auth/token`, authRequest);
    }
}
