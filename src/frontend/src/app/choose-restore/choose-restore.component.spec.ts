import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRestoreComponent } from './choose-restore.component';

describe('ChooseRestoreComponent', () => {
  let component: ChooseRestoreComponent;
  let fixture: ComponentFixture<ChooseRestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseRestoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
