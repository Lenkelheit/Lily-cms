import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ToastrModule } from 'ngx-toastr';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ConfirmComponent } from './modals/confirm/confirm.component';

const modules = [
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    EditorModule,
];

@NgModule({
    declarations: [
        HeaderComponent,
        SafeHtmlPipe,
        ConfirmComponent
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-center'
        }),
        ...modules
    ],
    exports: [
        ...modules,
        ToastrModule,
        HeaderComponent,
        SafeHtmlPipe,
        ConfirmComponent
    ],
    entryComponents: [
        ConfirmComponent
    ]
})
export class SharedModule { }
