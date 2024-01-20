import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzSiderComponent } from './nz-sider.component';

describe('NzSiderComponent', () => {
  let component: NzSiderComponent;
  let fixture: ComponentFixture<NzSiderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NzSiderComponent]
    });
    fixture = TestBed.createComponent(NzSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
