import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ConfirmComponent } from 'src/app/shared/modals/confirm/confirm.component';
import { BaseEntity } from 'src/app/shared/models/base/base-entity';
import { ConfirmationDialogData } from 'src/app/shared/models/dialog/confirmation-dialog-data';
import { ConfirmationDialogResult } from 'src/app/shared/models/enums/confirmation-dialog-result';
import { EntityType } from '../models/enums/entity-type';
import { PagesService } from './pages.service';
import { SitesService } from './sites.service';

export interface EntityOperationData {
    title: string;
    question: (title: string) => string;
    deleteEntity: (entityId: string) => Observable<void>;
}

@Injectable()
export class EntityOperationsService {

    entityData: Record<EntityType, EntityOperationData> = {
        [EntityType.Site]: {
            title: 'Delete Site?',
            question: (title: string) => `Are you sure you want to delete the "${title}" site?`,
            deleteEntity: (entityId) => this.sitesService.deleteSite(entityId)
        },
        [EntityType.Page]: {
            title: 'Delete Page?',
            question: (title: string) => `Are you sure you want to delete the "${title}" page?`,
            deleteEntity: (entityId) => this.pagesService.deletePage(entityId)
        }
    };

    constructor(
        private dialog: MatDialog,
        private sitesService: SitesService,
        private pagesService: PagesService
    ) { }

    deleteEntity(entity: BaseEntity, entityType: EntityType): Observable<void> {
        const entityData = this.entityData[entityType];

        const data: ConfirmationDialogData = {
            title: entityData.title,
            question: entityData.question(entity.title),
            submitText: 'Yes',
            cancelText: 'No'
        } as ConfirmationDialogData;

        const dialogRef = this.dialog.open(ConfirmComponent, {
            autoFocus: false,
            data
        });

        return dialogRef.afterClosed().pipe(
            filter(result => result === ConfirmationDialogResult.Submitted),
            switchMap(() => entityData.deleteEntity(entity.id))
        );
    }
}
