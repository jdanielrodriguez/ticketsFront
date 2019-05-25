import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceInfComponent } from './invoice-inf.component';

describe('InvoiceInfComponent', () => {
  let component: InvoiceInfComponent;
  let fixture: ComponentFixture<InvoiceInfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceInfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
