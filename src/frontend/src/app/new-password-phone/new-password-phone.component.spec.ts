import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordPhoneComponent } from './new-password-phone.component';

describe('NewPasswordPhoneComponent', () => {
  let component: NewPasswordPhoneComponent;
  let fixture: ComponentFixture<NewPasswordPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPasswordPhoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPasswordPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
