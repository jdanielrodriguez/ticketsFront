import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidMethodComponent } from './paid-method.component';

describe('PaidMethodComponent', () => {
  let component: PaidMethodComponent;
  let fixture: ComponentFixture<PaidMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
