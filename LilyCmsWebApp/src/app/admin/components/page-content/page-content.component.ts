import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { ContentType } from 'src/app/shared/models/enums/content-type';
import { PageArea } from 'src/app/shared/models/page-area/page-area';
import { PageDetails } from 'src/app/shared/models/page/page-details';
import { tinyMCEEditorOptions } from 'src/app/shared/utilities/tiny-mce-editor-options';
import { EditPageAreaComponent } from '../../modals/edit-page-area/edit-page-area.component';
import { EditPageArea } from '../../models/edit-page-area';
import { PagesService } from '../../services/pages.service';

@Component({
    selector: 'app-page-content',
    templateUrl: './page-content.component.html',
    styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements OnInit {
    @Input() page: PageDetails;

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialog: MatDialog,
        private pagesService: PagesService,
        private toastrService: ToastrService
    ) { }

    ngOnInit(): void {
        this.createForm();
    }

    get pageAreas() { return this.form.get('pageAreas') as FormArray; }

    get tinyMCEEditorOptions() {
        return tinyMCEEditorOptions;
    }

    get ContentType() {
        return ContentType;
    }

    editPagetArea(index: number, isNewItem: boolean) {
        if (!isNewItem) {
            Object.assign(this.page.pageAreas[index], this.pageAreas.value[index]);
        }

        const data: EditPageArea = {
            pageArea: isNewItem ? { pageId: this.page.id } as PageArea : Object.assign({}, this.page.pageAreas[index]),
            isNewItem: isNewItem,
        };
        const dialogRef = this.dialog.open(EditPageAreaComponent, {
            width: '800px',
            autoFocus: false,
            data
        });

        dialogRef.afterClosed().pipe(filter((value) => !!value)).subscribe((pageArea: PageArea) => {
            const contentAreaGroup = this.createPageAreaGroup(pageArea);

            if (isNewItem) {
                this.page.pageAreas.splice(index + 1, 0, pageArea);
                this.pageAreas.insert(index + 1, contentAreaGroup);
            } else {
                Object.assign(this.page.pageAreas[index], pageArea);
                this.pageAreas.setControl(index, contentAreaGroup);
            }
        });
    }

    onDeletePageArea(index: number) {
        this.page.pageAreas.splice(index, 1);
        this.pageAreas.removeAt(index);
    }

    savePageContent() {
        this.updatePageAreas();
        this.pagesService.savePageContent(this.page).subscribe((updatedPage: PageDetails) => {
            Object.assign(this.page, updatedPage);
            this.toastrService.success(`The "${this.page.title}" page content has been successfully updated`, 'Success');
        }, () => {
            this.toastrService.error(`Failed to update "${this.page.title}" page content. Please reload the page and try again`, 'Something went wrong');
        });
    }

    private updatePageAreas() {
        this.page.pageAreas.forEach((area, i) => {
            Object.assign(area, this.pageAreas.value[i]);
        });
    }

    private createForm() {
        this.form = this.fb.group({
            pageAreas: this.fb.array([]),
        });

        this.page.pageAreas.forEach(area => {
            this.pageAreas.push(this.createPageAreaGroup(area));
        })
    }

    private createPageAreaGroup(pageArea: PageArea) {
        return this.fb.group({
            content: [pageArea.content],
            enabled: [pageArea.enabled]
        });
    }
}
