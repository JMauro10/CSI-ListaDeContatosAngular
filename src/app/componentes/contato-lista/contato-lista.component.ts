import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {Contato} from '../../models/contato';
import {ContatoService} from '../../services/contato.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-contato-lista',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './contato-lista.component.html',
  styleUrl: './contato-lista.component.css'
})
export class ContatoListaComponent {
  listaContatos: Contato[] =[];


  constructor(private service: ContatoService) {
    this.listaContatos = this.service.listaContatos;
  }
}
