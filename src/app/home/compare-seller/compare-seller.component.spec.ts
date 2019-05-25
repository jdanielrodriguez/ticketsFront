import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareSellerComponent } from './compare-seller.component';

describe('CompareSellerComponent', () => {
  let component: CompareSellerComponent;
  let fixture: ComponentFixture<CompareSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
