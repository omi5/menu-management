import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTableComponent } from './category-table.component';

describe('CategoryTableComponent', () => {
  let component: CategoryTableComponent;
  let fixture: ComponentFixture<CategoryTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryTableComponent]
    });
    fixture = TestBed.createComponent(CategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
