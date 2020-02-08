import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhoneverifyPage } from './phoneverify.page';

describe('PhoneverifyPage', () => {
  let component: PhoneverifyPage;
  let fixture: ComponentFixture<PhoneverifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneverifyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneverifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
