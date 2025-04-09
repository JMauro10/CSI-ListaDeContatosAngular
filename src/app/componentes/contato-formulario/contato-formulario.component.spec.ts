import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoFormularioComponent } from './contato-formulario.component';

describe('ContatoFormularioComponent', () => {
  let component: ContatoFormularioComponent;
  let fixture: ComponentFixture<ContatoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContatoFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
