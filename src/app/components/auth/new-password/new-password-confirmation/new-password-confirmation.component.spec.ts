import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordConfirmationComponent } from './new-password-confirmation.component';

describe('NewPasswordConfirmationComponent', () => {
  let component: NewPasswordConfirmationComponent;
  let fixture: ComponentFixture<NewPasswordConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPasswordConfirmationComponent]
    });
    fixture = TestBed.createComponent(NewPasswordConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
