import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipbillComponent } from './membershipbill.component';

describe('MembershipbillComponent', () => {
  let component: MembershipbillComponent;
  let fixture: ComponentFixture<MembershipbillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipbillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
