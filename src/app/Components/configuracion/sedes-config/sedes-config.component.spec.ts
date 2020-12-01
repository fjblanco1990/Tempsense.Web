import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedesConfigComponent } from './sedes-config.component';

describe('SedesConfigComponent', () => {
  let component: SedesConfigComponent;
  let fixture: ComponentFixture<SedesConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedesConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SedesConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
