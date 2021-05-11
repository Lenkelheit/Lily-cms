import { ValidatorFn, FormControl, ValidationErrors } from "@angular/forms";

export function uniqueUrlSlugValidator(urlSlugs: string[]): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
        return urlSlugs.includes(control.value) ? { notUniqueUrl: true } : null;
    };
}