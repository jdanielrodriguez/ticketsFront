import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSellersComponent } from './contact-sellers.component';

describe('ContactSellersComponent', () => {
  let component: ContactSellersComponent;
  let fixture: ComponentFixture<ContactSellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactSellersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
