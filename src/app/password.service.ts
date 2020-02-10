import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  // a password can have at max MAX_PASSWORD_SCORE
  static MAX_PASSWORD_SCORE = 20;
  // define the minimum safe score for a password to be used
  static MIN_PASSWORD_SCORE = 8;

  constructor() {}

  // return a password score
  getPasswordScore(password: string | undefined): Observable<number> {
    password = password || '';

    return of(password.length).pipe(
      // output to console to show that our 'request' is running
      tap(_ => console.log('going to request backend for ', password)),
      map(score =>
        score > PasswordService.MAX_PASSWORD_SCORE
          ? PasswordService.MAX_PASSWORD_SCORE
          : score
      )
    );
  }
}
