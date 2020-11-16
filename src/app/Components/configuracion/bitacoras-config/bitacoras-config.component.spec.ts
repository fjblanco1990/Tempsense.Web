import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacorasConfigComponent } from './bitacoras-config.component';

describe('BitacorasConfigComponent', () => {
  let component: BitacorasConfigComponent;
  let fixture: ComponentFixture<BitacorasConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitacorasConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacorasConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
