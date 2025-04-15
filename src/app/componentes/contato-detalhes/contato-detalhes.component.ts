import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ContatoService} from '../../services/contato.service';
import {Router, RouterLink} from '@angular/router';
import {Contato} from '../../models/contato';

@Component({
  selector: 'app-contato-detalhes',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './contato-detalhes.component.html',
  styleUrl: './contato-detalhes.component.css'
})
export class ContatoDetalhesComponent {
  listaContatos: Contato[] =[];

  constructor(private service: ContatoService) {
    this.service.listarContatos().subscribe(contatos => this.listaContatos = contatos);
  }
}
