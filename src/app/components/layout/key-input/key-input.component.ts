import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-key-input',
  templateUrl: './key-input.component.html',
  styleUrls: ['./key-input.component.css'],
})
export class KeyInputComponent {
  @Output() keyInput = new EventEmitter<string>();
  @Input() purposeName!: string;
  keyForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  currentData: string | undefined;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formValidator();
    this.subscribeFormChanges();
  }

  formValidator(): void {
    this.keyForm = this.formBuilder.group({ key: ['', Validators.required] });
  }

  subscribeFormChanges(): void {
    this.keyForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((formValues) => {
        this.currentData = formValues.key;
      });
  }

  SendKey() {
    if (this.keyForm.valid) {
      this.keyInput.emit(this.currentData);
    }
  }
}
