import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContentType, ContentTypeNames } from 'src/app/shared/models/enums/content-type';
import { EnumUtil } from 'src/app/shared/utilities/enum-util';
import { Helpers } from 'src/app/shared/utilities/helpers';
import { tinyMCEEditorOptions } from 'src/app/shared/utilities/tiny-mce-editor-options';
import { EditPageArea } from '../../models/edit-page-area';
import { EditPageComponent } from '../edit-page/edit-page.component';

@Component({
    selector: 'app-edit-page-area',
    templateUrl: './edit-page-area.component.html',
    styleUrls: ['./edit-page-area.component.scss']
})
export class EditPageAreaComponent implements OnInit {
    contentTypeKeys: string[];

    form: FormGroup;
    formSubmitted = false;

    constructor(
        private dialogRef: MatDialogRef<EditPageComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: EditPageArea
    ) { }

    ngOnInit(): void {
        this.initEnumKeys();
        this.createForm();
    }

    get contentType() { return this.form.get('contentType'); }
    get title() { return this.form.get('title'); }
    get description() { return this.form.get('description'); }
    get enabled() { return this.form.get('enabled'); }

    get tinyMCEEditorOptions() {
        return tinyMCEEditorOptions;
    }

    get ContentType() {
        return ContentType;
    }

    get ContentTypeNames() {
        return ContentTypeNames;
    }

    onClose(value = null) {
        this.dialogRef.close(value);
    }

    onSubmit(): void {
        this.formSubmitted = true;
        if (this.form.valid) {
            Object.assign(this.data.pageArea, this.form.value);
            this.onClose(this.data.pageArea);
        }
    }

    private initEnumKeys() {
        this.contentTypeKeys = EnumUtil.getEnumKeys(ContentType);
    }

    private createForm() {
        this.form = this.fb.group({
            contentType: [this.data.pageArea.contentType, [Validators.required]],
            title: [this.data.pageArea.title, [Validators.required, Validators.minLength(Helpers.TextMinLength)]],
            description: [this.data.pageArea.description, [Validators.required, Validators.minLength(Helpers.TextMinLength)]],
            enabled: [!!this.data.pageArea.enabled],
        });
    }
}
