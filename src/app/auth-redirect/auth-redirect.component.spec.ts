import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRedirectComponent } from './auth-redirect.component';

describe('AuthRedirectComponent', () => {
  let component: AuthRedirectComponent;
  let fixture: ComponentFixture<AuthRedirectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthRedirectComponent]
    });
    fixture = TestBed.createComponent(AuthRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
