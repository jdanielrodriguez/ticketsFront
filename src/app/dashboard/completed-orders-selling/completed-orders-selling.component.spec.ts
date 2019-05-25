import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedOrdersSellingComponent } from './completed-orders-selling.component';

describe('CompletedOrdersSellingComponent', () => {
  let component: CompletedOrdersSellingComponent;
  let fixture: ComponentFixture<CompletedOrdersSellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedOrdersSellingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedOrdersSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
