import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Site } from 'src/app/shared/models/site';
import { Helpers } from 'src/app/shared/utilities/helpers';
import { tinyMCEEditorOptions } from 'src/app/shared/utilities/tiny-mce-editor-options';
import { SitesService } from '../../services/sites.service';
import { uniqueUrlSlugValidator } from '../../validators/unique-url-slug-validator';

@Component({
    selector: 'app-add-site',
    templateUrl: './add-site.component.html',
    styleUrls: ['./add-site.component.scss']
})
export class AddSiteComponent implements OnInit {
    site: Site = {} as Site;

    form: FormGroup;
    formSubmitted = false;

    constructor(
        private dialogRef: MatDialogRef<AddSiteComponent>,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private sitesService: SitesService,
        @Inject(MAT_DIALOG_DATA) public urlSlugs: string[]
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
            Object.assign(this.site, this.form.value);
            this.sitesService.addSite(this.site).subscribe((newSite: Site) => {
                console.log(newSite);
                this.onClose(newSite);
            }, () => {
                this.toastrService.error('Failed to create new site. Please reload the page and try again', 'Something went wrong');
            });
        }
    }

    private createForm() {
        console.log(this.urlSlugs);
        this.form = this.fb.group({
            title: [this.site.title, [Validators.required, Validators.minLength(Helpers.TextMinLength)]],
            description: [this.site.description, [Validators.required, Validators.minLength(Helpers.TextMinLength)]],
            urlSlug: [this.site.urlSlug, [Validators.required, Validators.minLength(Helpers.TextMinLength),
            Validators.pattern(Helpers.UrlSlugValidator), uniqueUrlSlugValidator(this.urlSlugs)]],
            enabled: [true],
        });
    }
}
