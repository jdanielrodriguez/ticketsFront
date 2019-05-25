import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLComponent } from './create-l.component';

describe('CreateLComponent', () => {
  let component: CreateLComponent;
  let fixture: ComponentFixture<CreateLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
