import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEditItemComponent } from './test-edit-item.component';

describe('TestEditItemComponent', () => {
  let component: TestEditItemComponent;
  let fixture: ComponentFixture<TestEditItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestEditItemComponent]
    });
    fixture = TestBed.createComponent(TestEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
