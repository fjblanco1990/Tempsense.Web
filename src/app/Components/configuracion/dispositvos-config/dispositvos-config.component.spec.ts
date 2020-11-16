import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositvosConfigComponent } from './dispositvos-config.component';

describe('DispositvosConfigComponent', () => {
  let component: DispositvosConfigComponent;
  let fixture: ComponentFixture<DispositvosConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispositvosConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositvosConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
