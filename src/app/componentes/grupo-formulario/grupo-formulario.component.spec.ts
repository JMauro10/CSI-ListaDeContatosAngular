import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoFormularioComponent } from './grupo-formulario.component';

describe('GrupoFormularioComponent', () => {
  let component: GrupoFormularioComponent;
  let fixture: ComponentFixture<GrupoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
