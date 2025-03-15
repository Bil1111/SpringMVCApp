import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPage2OnlytextComponent } from './new-page2-onlytext.component';

describe('NewPage2OnlytextComponent', () => {
  let component: NewPage2OnlytextComponent;
  let fixture: ComponentFixture<NewPage2OnlytextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPage2OnlytextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPage2OnlytextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
