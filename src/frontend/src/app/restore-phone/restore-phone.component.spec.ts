import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePhoneComponent } from './restore-phone.component';

describe('RestorePhoneComponent', () => {
  let component: RestorePhoneComponent;
  let fixture: ComponentFixture<RestorePhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestorePhoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestorePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
