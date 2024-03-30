import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMenuFormComponent } from './create-menu-form.component';

describe('CreateMenuFormComponent', () => {
  let component: CreateMenuFormComponent;
  let fixture: ComponentFixture<CreateMenuFormComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMenuFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMenuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
