import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DishPage } from './dish.page';

describe('DishPage', () => {
  let component: DishPage;
  let fixture: ComponentFixture<DishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
