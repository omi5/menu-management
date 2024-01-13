import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTimeTableComponent } from './schedule-time-table.component';

describe('ScheduleTimeTableComponent', () => {
  let component: ScheduleTimeTableComponent;
  let fixture: ComponentFixture<ScheduleTimeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleTimeTableComponent]
    });
    fixture = TestBed.createComponent(ScheduleTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
