import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ConfirmComponent } from 'src/app/shared/modals/confirm/confirm.component';
import { ConfirmationDialogData } from 'src/app/shared/models/confirmation-dialog-data';
import { ConfirmationDialogResult } from 'src/app/shared/models/enums/confirmation-dialog-result';
import { Site } from 'src/app/shared/models/site/site';
import { SitesService } from './sites.service';

@Injectable()
export class SiteOperationsService {

    constructor(
        private dialog: MatDialog,
        private sitesService: SitesService,
    ) { }

    deleteSite(site: Site): Observable<void> {
        const data: ConfirmationDialogData = {
            title: 'Delete Site?',
            question: `Are you sure you want to delete the "${site.title}" site?`,
            submitText: 'Yes',
            cancelText: 'No'
        };
        const dialogRef = this.dialog.open(ConfirmComponent, {
            autoFocus: false,
            data
        });

        return dialogRef.afterClosed().pipe(
            filter(result => result === ConfirmationDialogResult.Submitted),
            switchMap(() => this.sitesService.deleteSite(site.id))
        );
    }
}
