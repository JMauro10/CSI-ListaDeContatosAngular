import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaCompromissosComponent } from './agenda-compromissos.component';

describe('AgendaCompromissosComponent', () => {
  let component: AgendaCompromissosComponent;
  let fixture: ComponentFixture<AgendaCompromissosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaCompromissosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaCompromissosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
