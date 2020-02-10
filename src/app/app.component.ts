import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPassValidator } from './async-pass.validator';
import { PasswordService } from './password.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  form: FormGroup;
  passScoreBar$: Observable<number>;

  constructor(
    private fb: FormBuilder,
    private pwValidator: AsyncPassValidator
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', [], [this.pwValidator.validate.bind(this.pwValidator)]]
    });

    this.passScoreBar$ = this.pwValidator.score.pipe(
      map(score => {
        // first, normalize value for minimum needed password strength.
        score =
          score > PasswordService.MIN_PASSWORD_SCORE
            ? PasswordService.MIN_PASSWORD_SCORE
            : score;

        // then, normalize for progress bar value
        return score * (100 / PasswordService.MIN_PASSWORD_SCORE);
      })
    );
  }
}
