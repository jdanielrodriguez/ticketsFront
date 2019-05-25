import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesPrivateComponent } from './references-private.component';

describe('ReferencesPrivateComponent', () => {
  let component: ReferencesPrivateComponent;
  let fixture: ComponentFixture<ReferencesPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferencesPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
