import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmbralConfigComponent } from './umbral-config.component';

describe('UmbralConfigComponent', () => {
  let component: UmbralConfigComponent;
  let fixture: ComponentFixture<UmbralConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UmbralConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmbralConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
