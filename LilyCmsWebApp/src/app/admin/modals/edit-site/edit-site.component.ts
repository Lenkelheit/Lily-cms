import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Site } from 'src/app/shared/models/site/site';
import { Helpers } from 'src/app/shared/utilities/helpers';
import { tinyMCEEditorOptions } from 'src/app/shared/utilities/tiny-mce-editor-options';
import { EditSite } from '../../models/edit-site';
import { SitesService } from '../../services/sites.service';
import { UrlOperationsService } from '../../services/url-operations.service';

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
        private urlOperationsService: UrlOperationsService,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: EditSite
    ) { }

    ngOnInit(): void {
        this.createForm();
    }

    get title() { return this.form.get('title'); }
    get description() { return this.form.get('description'); }

    get tinyMCEEditorOptions() {
        return tinyMCEEditorOptions;
    }

    onClose(value: Site = null) {
        this.dialogRef.close(value);
    }

    onSubmit(navigate: boolean = false) {
        this.formSubmitted = true;
        if (this.form.valid) {
            Object.assign(this.data.site, this.form.value);
            this.sitesService.addOrUpdateSite(this.data.site).subscribe((updatedSite: Site) => {
                if (navigate) {
                    this.router.navigate(['./admin/sites', updatedSite.urlSlug]);
                }
                this.onClose(updatedSite);
            }, () => {
                this.toastrService.error(`Failed to ${this.data.isNewItem ? 'create new' : 'update'} site. Please reload the page and try again`, 'Something went wrong');
            });
        }
    }

    private createForm() {
        this.form = this.fb.group({
            title: [this.data.site.title, [Validators.required, Validators.minLength(Helpers.TextMinLength)]],
            description: [this.data.site.description, [Validators.required, Validators.minLength(Helpers.TextMinLength)]],
            enabled: [!!this.data.site.enabled],
        });
    }
}
