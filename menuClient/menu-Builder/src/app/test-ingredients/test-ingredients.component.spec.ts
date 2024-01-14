import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestIngredientsComponent } from './test-ingredients.component';

describe('TestIngredientsComponent', () => {
  let component: TestIngredientsComponent;
  let fixture: ComponentFixture<TestIngredientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestIngredientsComponent]
    });
    fixture = TestBed.createComponent(TestIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
