import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTableComponent } from './recipe-table.component';

describe('MakeRecipeTableComponent', () => {
  let component: RecipeTableComponent;
  let fixture: ComponentFixture<RecipeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeTableComponent]
    });
    fixture = TestBed.createComponent(RecipeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
