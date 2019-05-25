import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBisComponent } from './detail-bis.component';

describe('DetailBisComponent', () => {
  let component: DetailBisComponent;
  let fixture: ComponentFixture<DetailBisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
