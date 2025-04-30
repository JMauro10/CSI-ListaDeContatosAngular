import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ContatoService} from '../../services/contato.service';
import {Router, RouterLink} from '@angular/router';
import {Contato} from '../../models/contato';
import {MenuItem} from 'primeng/api';
import {Menubar} from 'primeng/menubar';
import {GrupoService} from '../../services/grupo.service';
import {TableModule} from 'primeng/table';

@Component({
    selector: 'app-contato-detalhes',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    Menubar,
    TableModule
  ],
    templateUrl: './contato-lista.component.html',
    styleUrl: './contato-lista.component.css'
})
export class ContatoDetalhesComponent {
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
    }
  ];
  listaContatos: Contato[] =[];

  constructor(private service: ContatoService, private grupoService:GrupoService, private router: Router) {
    this.service.listarContatos().subscribe(contatos => this.listaContatos = contatos);
  }
}
