import { FormControl } from '@angular/forms';

export function numberArrayValidator(control: FormControl) {
  const value: number[] = control.value;
  const isValid = Array.isArray(value) && value.every((item) => typeof item === 'number');
  return isValid ? null : { invalidNumberArray: true };
}

export const pricePattern = /^\d+(\.\d{1,2})?$/;
