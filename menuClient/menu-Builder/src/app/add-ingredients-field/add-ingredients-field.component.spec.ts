import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddIngredientsFieldComponent } from './add-ingredients-field.component';

describe('AddIngredientsFieldComponent', () => {
  let component: AddIngredientsFieldComponent;
  let fixture: ComponentFixture<AddIngredientsFieldComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIngredientsFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIngredientsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
