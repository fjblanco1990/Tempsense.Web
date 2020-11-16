import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasConfigComponent } from './empresas-config.component';

describe('EmpresasConfigComponent', () => {
  let component: EmpresasConfigComponent;
  let fixture: ComponentFixture<EmpresasConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresasConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
