import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {Contato} from '../../models/contato';
import {ContatoService} from '../../services/contato.service';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-contato-lista',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    JsonPipe
  ],
  templateUrl: './contato-lista.component.html',
  styleUrl: './contato-lista.component.css'
})
export class ContatoListaComponent {
  listaContatos: Contato[] =[];

  constructor(private service: ContatoService) {
    this.service.listarContatos().subscribe(contatos => this.listaContatos = contatos);
  }
}
