import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpashLogoComponent } from './spash-logo.component';

describe('SpashLogoComponent', () => {
  let component: SpashLogoComponent;
  let fixture: ComponentFixture<SpashLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpashLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpashLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
