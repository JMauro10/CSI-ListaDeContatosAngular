import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromissoFormularioComponent } from './compromisso-formulario.component';

describe('CompromissoFormularioComponent', () => {
  let component: CompromissoFormularioComponent;
  let fixture: ComponentFixture<CompromissoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompromissoFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompromissoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
