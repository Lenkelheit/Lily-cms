import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageFeedback } from 'src/app/shared/models/related-page-info/page-feedback';
import { Helpers } from 'src/app/shared/utilities/helpers';

@Component({
    selector: 'app-feedback',
    templateUrl: './add-feedback.component.html',
    styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent implements OnInit {
    form: FormGroup;
    formSubmitted = false;

    constructor(
        private dialogRef: MatDialogRef<AddFeedbackComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public pageFeedback: PageFeedback
    ) { }

    ngOnInit(): void {
        this.createForm();
    }

    get Helpers() {
        return Helpers;
    }

    get userEmail() { return this.form.get('userEmail'); }
    get comment() { return this.form.get('comment'); }

    onClose(value = null) {
        this.dialogRef.close(value);
    }

    onSubmit(): void {
        this.formSubmitted = true;
        if (this.form.valid) {
            Object.assign(this.pageFeedback, this.form.value);
            this.onClose(this.pageFeedback);
        }
    }

    private createForm() {
        this.form = this.fb.group({
            userEmail: [this.pageFeedback.userEmail, [Validators.email]],
            comment: [this.pageFeedback.comment, [Validators.minLength(Helpers.TextMinLength)]],
        });
    }
}
