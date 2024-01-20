import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzHeaderForTriggerComponent } from './nz-header-for-trigger.component';

describe('NzHeaderForTriggerComponent', () => {
  let component: NzHeaderForTriggerComponent;
  let fixture: ComponentFixture<NzHeaderForTriggerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NzHeaderForTriggerComponent]
    });
    fixture = TestBed.createComponent(NzHeaderForTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
