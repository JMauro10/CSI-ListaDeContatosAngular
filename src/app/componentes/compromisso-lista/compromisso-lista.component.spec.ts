import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromissoListaComponent } from './compromisso-lista.component';

describe('CompromissoListaComponent', () => {
  let component: CompromissoListaComponent;
  let fixture: ComponentFixture<CompromissoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompromissoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompromissoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
