import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors
} from '@angular/forms';
import { Observable, of, Subject, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { PasswordService } from './password.service';

@Injectable({ providedIn: 'root' })
export class AsyncPassValidator implements AsyncValidator {
  constructor(private pwService: PasswordService) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.pwService.getPasswordScore(control.value).pipe(
      map(score => {
        // if password score is below threshold, validation will fail
        if (score < PasswordService.MIN_PASSWORD_SCORE) {
          return { unsafe: true };
        }
        // otherwise, no errors
        return null;
      })
    );
  }
}
