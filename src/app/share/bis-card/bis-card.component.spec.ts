import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BisCardComponent } from './bis-card.component';

describe('BisCardComponent', () => {
  let component: BisCardComponent;
  let fixture: ComponentFixture<BisCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BisCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BisCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
