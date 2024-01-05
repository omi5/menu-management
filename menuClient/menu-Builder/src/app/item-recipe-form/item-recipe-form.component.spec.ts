import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemRecipeFormComponent } from './item-recipe-form.component';

describe('ItemRecipeFormComponent', () => {
  let component: ItemRecipeFormComponent;
  let fixture: ComponentFixture<ItemRecipeFormComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemRecipeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemRecipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
