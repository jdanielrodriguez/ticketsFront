import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainskillsComponent } from './mainskills.component';

describe('MainskillsComponent', () => {
  let component: MainskillsComponent;
  let fixture: ComponentFixture<MainskillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainskillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainskillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
