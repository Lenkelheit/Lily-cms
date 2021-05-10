import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from 'src/app/shared/models/site';
import { environment } from 'src/environments/environment';

@Injectable()
export class SitesService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getSites(): Observable<Site[]> {
        return this.http.get<Site[]>(`${this.baseUrl}/api/sites`);
    }
}
