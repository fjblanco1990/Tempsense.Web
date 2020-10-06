import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmbralComponent } from './umbral.component';

describe('UmbralComponent', () => {
  let component: UmbralComponent;
  let fixture: ComponentFixture<UmbralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UmbralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmbralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
