import { Component } from '@angular/core';
import {Menubar} from "primeng/menubar";
import {MenuItem} from 'primeng/api';
import {ContatoService} from '../../services/contato.service';
import {GrupoService} from '../../services/grupo.service';
import {Router} from '@angular/router';
import {Grupo} from '../../models/grupo';
import {NgForOf, NgIf} from '@angular/common';
import {TableModule} from 'primeng/table';

@Component({
    selector: 'app-grupo-lista',
  imports: [
    Menubar,
    NgForOf,
    NgIf,
    TableModule
  ],
    templateUrl: './grupo-lista.component.html',
    styleUrl: './grupo-lista.component.css'
})
export class GrupoListaComponent {

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
  listaGrupos: Grupo[] =[];


  constructor(private service: ContatoService, private grupoService:GrupoService, private router: Router) {
    this.grupoService.listarGrupos().subscribe(grupos => this.listaGrupos = grupos);
  }
}
