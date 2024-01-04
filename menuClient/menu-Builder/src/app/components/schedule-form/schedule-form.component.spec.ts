import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleFormComponent } from './schedule-form.component';

describe('ScheduleFormComponent', () => {
  let component: ScheduleFormComponent;
  let fixture: ComponentFixture<ScheduleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleFormComponent]
    });
    fixture = TestBed.createComponent(ScheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
