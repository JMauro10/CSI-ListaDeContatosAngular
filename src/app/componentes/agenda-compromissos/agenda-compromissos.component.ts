import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Menubar} from 'primeng/menubar';

@Component({
  selector: 'app-agenda-compromissos',
  imports: [
    Menubar
  ],
  templateUrl: './agenda-compromissos.component.html',
  styleUrl: './agenda-compromissos.component.css'
})
export class AgendaCompromissosComponent {

  items: MenuItem[] = [
    {
      label: 'Novo Contato',
      routerLink: '/contato-formulario'
    },
    {
      label: 'Contatos',
      routerLink: '/contato-lista'
    },
    {
      label: 'Novo Grupo',
      routerLink: '/grupo-formulario'
    },
    {
      label: 'Grupos',
      routerLink: '/grupo-lista'
    },
    {
      label: 'Novo Compromisso',
      routerLink: '/compromisso-formulario'
    },
    {
      label: 'Compromissos',
      routerLink: '/compromisso-lista'
    }
  ];

}
