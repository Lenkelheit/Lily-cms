import { AbstractControl } from "@angular/forms";

export class Helpers {
    public static readonly TextMinLength = 3;
    public static readonly UrlSlugValidator = /^[a-z0-9]+(?:\-[a-z0-9]+)*$/m;

    public static getErrorsAmount(control: AbstractControl) {
        return control.errors ? Object.keys(control.errors).length : 0;
    }
}