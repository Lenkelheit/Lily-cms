import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Site } from 'src/app/shared/models/site';
import { Helpers } from 'src/app/shared/utilities/helpers';
import { tinyMCEEditorOptions } from 'src/app/shared/utilities/tiny-mce-editor-options';
import { EditSite } from '../../models/edit-site';
import { SitesService } from '../../services/sites.service';
import { uniqueUrlSlugValidator } from '../../validators/unique-url-slug-validator';

@Component({
    selector: 'edit-add-site',
    templateUrl: './edit-site.component.html',
    styleUrls: ['./edit-site.component.scss']
})
export class EditSiteComponent implements OnInit {

    form: FormGroup;
    formSubmitted = false;

    constructor(
        private dialogRef: MatDialogRef<EditSiteComponent>,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private sitesService: SitesService,
        @Inject(MAT_DIALOG_DATA) public data: EditSite
    ) { }

    ngOnInit(): void {
        this.createForm();
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

    onSubmit() {
        this.formSubmitted = true;
        if (this.form.valid) {
            Object.assign(this.data.site, this.form.value);
            this.sitesService.addOrUpdateSite(this.data.site).subscribe((updatedSite: Site) => {
                console.log(updatedSite);
                this.onClose(updatedSite);
            }, () => {
                this.toastrService.error(`Failed to ${this.data.isNewItem ? 'create new' : 'update'} site. Please reload the page and try again`, 'Something went wrong');
            });
        }
    }

    private createForm() {
        console.log(this.data.usedUniqueUrls);
        this.form = this.fb.group({
            title: [this.data.site.title, [Validators.required, Validators.minLength(Helpers.TextMinLength)]],
            description: [this.data.site.description, [Validators.required, Validators.minLength(Helpers.TextMinLength)]],
            urlSlug: [this.data.site.urlSlug, [Validators.required, Validators.minLength(Helpers.TextMinLength),
            Validators.pattern(Helpers.UrlSlugValidator), uniqueUrlSlugValidator(this.data.usedUniqueUrls)]],
            enabled: [!!this.data.site.enabled],
        });
    }
}
