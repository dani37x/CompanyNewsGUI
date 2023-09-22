import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-key-input',
  templateUrl: './key-input.component.html',
  styleUrls: ['./key-input.component.css'],
})
export class KeyInputComponent implements OnInit, OnDestroy {
  @Output() keyData = new EventEmitter<string>();
  @Input() purposeName!: string;
  keyForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  currentData: string | undefined;
  private subscription$ = new Subscription();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formValidator();
    this.subscribeFormChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription$.unsubscribe();
    this.keyData.unsubscribe();
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

  sendKey(): void {
    if (this.keyForm.valid) {
      this.keyData.emit(this.currentData);
    }
  }
}
