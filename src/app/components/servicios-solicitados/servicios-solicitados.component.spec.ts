import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosSolicitadosComponent } from './servicios-solicitados.component';

describe('ServiciosSolicitadosComponent', () => {
  let component: ServiciosSolicitadosComponent;
  let fixture: ComponentFixture<ServiciosSolicitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosSolicitadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosSolicitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
