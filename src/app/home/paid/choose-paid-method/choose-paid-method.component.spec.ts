import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePaidMethodComponent } from './choose-paid-method.component';

describe('ChoosePaidMethodComponent', () => {
  let component: ChoosePaidMethodComponent;
  let fixture: ComponentFixture<ChoosePaidMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosePaidMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePaidMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
