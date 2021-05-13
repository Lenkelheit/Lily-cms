import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Page } from 'src/app/shared/models/page/page';
import { Helpers } from 'src/app/shared/utilities/helpers';
import { tinyMCEEditorOptions } from 'src/app/shared/utilities/tiny-mce-editor-options';
import { EditPage } from '../../models/edit-page';
import { UrlOwner } from '../../models/enums/url-owner';
import { PagesService } from '../../services/pages.service';
import { UrlOperationsService } from '../../services/url-operations.service';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
    form: FormGroup;
    formSubmitted = false;

    constructor(
        private dialogRef: MatDialogRef<EditPageComponent>,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private pagesService: PagesService,
        private urlOperationsService: UrlOperationsService,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: EditPage
    ) { }

    ngOnInit(): void {
        this.createForm();
        this.onChanges();
    }

    get title() { return this.form.get('title'); }
    get description() { return this.form.get('description'); }
    get urlSlug() { return this.form.get('urlSlug'); }

    get tinyMCEEditorOptions() {
        return tinyMCEEditorOptions;
    }

    onClose(value = null) {
        this.dialogRef.close(value);
    }

    onSubmit(navigate: boolean = false) {
        this.formSubmitted = true;
        if (this.form.valid) {
            Object.assign(this.data.page, this.form.value);
            this.pagesService.addOrUpdatePage(this.data.page).subscribe((updatedPage: Page) => {
                if (navigate) {
                    this.router.navigate(['./admin/sites', this.data.siteUrl, updatedPage.urlSlug]);
                }
                this.onClose(updatedPage);
            }, () => {
                this.toastrService.error(`Failed to ${this.data.isNewItem ? 'create new' : 'update'} page. Please reload the page and try again`, 'Something went wrong');
            });
        }
    }

    private onChanges() {
        this.urlSlug.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((urlSlug: string) => {
            this.validateUrlSlug();
        });
    }

    private validateUrlSlug() {
        this.urlOperationsService.validateUrlSlug(this.data.page.urlSlug, this.urlSlug, UrlOwner.Page, this.data.page.siteId);
    }

    private createForm() {
        this.form = this.fb.group({
            title: [this.data.page.title, [Validators.required, Validators.minLength(Helpers.TextMinLength)]],
            description: [this.data.page.description, [Validators.required, Validators.minLength(Helpers.TextMinLength)]],
            urlSlug: [this.data.page.urlSlug, [Validators.required, Validators.minLength(Helpers.TextMinLength), Validators.pattern(Helpers.UrlSlugValidator)]],
            enabled: [!!this.data.page.enabled],
        });
    }
}
