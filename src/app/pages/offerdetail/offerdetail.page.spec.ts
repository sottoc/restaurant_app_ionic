import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfferdetailPage } from './offerdetail.page';

describe('OfferdetailPage', () => {
  let component: OfferdetailPage;
  let fixture: ComponentFixture<OfferdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfferdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
