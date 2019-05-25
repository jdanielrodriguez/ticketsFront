import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSellerComponent } from './detail-seller.component';

describe('DetailSellerComponent', () => {
  let component: DetailSellerComponent;
  let fixture: ComponentFixture<DetailSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
