import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPassValidator } from './async-pass.validator';

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
  }
}
