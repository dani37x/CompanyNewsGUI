import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function equalToValidator(
  firstField: string,
  secondField: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value1 = control.get(firstField)?.value;
    const value2 = control.get(secondField)?.value;
    return value1 === value2 ? null : { notFieldEquality: true };
  };
}
