import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeRecipeTableComponent } from './make-recipe-table.component';

describe('MakeRecipeTableComponent', () => {
  let component: MakeRecipeTableComponent;
  let fixture: ComponentFixture<MakeRecipeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeRecipeTableComponent]
    });
    fixture = TestBed.createComponent(MakeRecipeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
