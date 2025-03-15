import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordEmailComponent } from './new-password-email.component';

describe('NewPasswordEmailComponent', () => {
  let component: NewPasswordEmailComponent;
  let fixture: ComponentFixture<NewPasswordEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPasswordEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPasswordEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
