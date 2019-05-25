import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveBisComponent } from './active-bis.component';

describe('ActiveBisComponent', () => {
  let component: ActiveBisComponent;
  let fixture: ComponentFixture<ActiveBisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveBisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveBisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
