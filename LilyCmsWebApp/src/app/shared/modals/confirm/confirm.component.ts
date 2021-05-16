import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogData } from '../../models/dialog/confirmation-dialog-data';
import { ConfirmationDialogResult } from '../../models/enums/confirmation-dialog-result';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

    constructor(
        private dialogRef: MatDialogRef<ConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
    ) { }

    ngOnInit(): void {
    }

    onCancel() {
        this.dialogRef.close(ConfirmationDialogResult.Canceled)
    }

    onSubmit() {
        this.dialogRef.close(ConfirmationDialogResult.Submitted)
    }
}
